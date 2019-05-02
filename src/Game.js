import * as React from "react";
import firebase from "firebase";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Board from "./Board";
import Rules from "./Rules";
import Learn from "./Learn";
import { isSET, newCards } from "./api";

const tabs = ["Rules", "Easy", "Medium", "Hard"];

class App extends React.Component {
  constructor(props) {
    super(props);

    const playerId = localStorage.getItem("set_player_id");
    if (playerId) {
      this.playerId = playerId;
    } else {
      this.playerId = Math.floor(Math.random() * 0x1000000).toString(16);
      localStorage.setItem("set_player_id", this.playerId);
    }
    this.startTime = new Date();
    this.state = { tab: 1, cards: newCards(6).map(value => ({ value })) };
  }

  handleClick = idx => {
    const cards = [...this.state.cards];
    cards[idx].selected = !cards[idx].selected;
    const selectedCards = cards.filter(card => card.selected);

    if (selectedCards.length === 3) {
      if (isSET(selectedCards.map(c => c.value))) {
        const _cards = cards.map(x => ({ ...x, correct: true }));
        this.setState({ cards: _cards });
        const dbRef = firebase.database().ref("events");
        const toDatabase = {
          playerId: this.playerId,
          time: new Date() - this.startTime,
          date: Date.now(),
          mode: tabs[this.state.tab]
        };
        dbRef.push().set(toDatabase);
        setTimeout(() => {
          const cards = newCards(3 * (this.state.tab + 1)).map(value => ({
            value
          }));
          this.setState({ cards });
          this.startTime = new Date();
        }, 2000);
      } else {
        const _cards = cards.map(x => ({ ...x, wrong: true }));
        this.setState({ cards: _cards });
        setTimeout(
          () =>
            this.setState({
              cards: cards.map(x => ({
                ...x,
                wrong: false,
                correct: false,
                selected: false
              }))
            }),
          1000
        );
      }
    } else if (cards.filter(card => card.selected).length < 3) {
      this.setState({ cards });
    }
  };

  changeTab = (_, tab) => {
    if (tab > 0) {
      const cards = newCards(3 * (tab + 1)).map(value => ({ value }));
      this.setState({ cards });
      this.startTime = new Date();
    }
    this.setState({ tab });
  };

  render() {
    const { cards, tab } = this.state;
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#bbbbbb",
          position: "absolute",
          display: "flex",
          flexFlow: "column"
        }}
      >
        <Paper>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.changeTab}
            fullWidth
          >
            {tabs.map(label => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Paper>
        <div className="main-container">
          {tab === 0 && <Rules />}
          {tab > 0 && (
            <Board
              cards={cards.map((card, idx) => ({
                ...card,
                onClick: () => this.handleClick(idx)
              }))}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
