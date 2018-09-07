import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = () => ({
  main: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    maxWidth: "300px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#999",
    margin: "10px",
    transform: "skewX(-20deg)",
    justifyContent: "flex-start"
  }
});

const Home = ({ classes, changeView }) => (
  <div className={classes.main}>
    <Button
      size="large"
      className={classes.button}
      onClick={() => changeView("learn")}
    >
      Learn the rules
    </Button>
    <Button
      size="large"
      className={classes.button}
      onClick={() => changeView("game")}
    >
      Play
    </Button>
    <Button
      size="large"
      className={classes.button}
      onClick={() => changeView("stats")}
    >
      Statistics
    </Button>
  </div>
);

export default withStyles(styles)(Home);
