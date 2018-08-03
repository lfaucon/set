import * as React from "react";
import Grid from "@material-ui/core/Grid";
import firebase from "firebase";

import Board from "./Board";
import { isSET, newCards } from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);

    const playerId = localStorage.getItem("set_player_id");
    if (playerId) {
      console.log(playerId);
      this.playerId = playerId;
    } else {
      this.playerId = Math.floor(Math.random() * 0x1000000).toString(16);
      localStorage.setItem("set_player_id", this.playerId);
    }

    this.state = { cards: newCards().map(value => ({ value })) };
    this.startTime = new Date();
  }

  handleClick = idx => {
    const cards = [...this.state.cards];
    cards[idx].selected = !cards[idx].selected;
    const selectedCards = cards.filter(card => card.selected);
    if (selectedCards.length === 3) {
      if (isSET(selectedCards.map(c => c.value))) {
        const _cards = cards.map(x => ({ ...x, correct: x.selected }));
        this.setState({ cards: _cards });
        const dbRef = firebase.database().ref("events");
        dbRef.push().set({
          playerId: this.playerId,
          time: new Date() - this.startTime
        });
        setTimeout(() => {
          this.setState({ cards: newCards().map(value => ({ value })) });
          this.startTime = new Date();
        }, 1000);
      } else {
        const _cards = cards.map(x => ({ ...x, wrong: x.selected }));
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

  render() {
    const { cards } = this.state;
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#fffff0",
          position: "absolute"
        }}
      >
        <Grid container spacing={0} style={{ marginTop: "5vh" }}>
          <Grid item xs={1} sm={2} md={3} lg={4} />
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Board
              cards={cards.map((card, idx) => ({
                ...card,
                onClick: () => this.handleClick(idx)
              }))}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} />
        </Grid>
      </div>
    );
  }
}

export default App;
