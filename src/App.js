import * as React from "react";
import firebase from "firebase";

import Game from "./Game";
import Home from "./Home";
import Learn from "./Learn";
import Stats from "./Stats";

class App extends React.Component {
  state = {
    view: "game"
  };

  render() {
    const { view } = this.state;
    if (view === "home")
      return <Home changeView={view => this.setState({ view })} />;
    if (view === "learn") return <Learn />;
    if (view === "game") return <Game />;
    if (view === "stats") return <Stats />;
  }
}

export default App;
