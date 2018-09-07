import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Card from "./Card";

const styles = () => ({
  main: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    maxWidth: "300px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: "10px"
  },
  example: {
    width: "120px",
    height: "60px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const Example = withStyles(styles)(({ cards, classes }) => (
  <div className={classes.example}>
    {cards.map(card => (
      <Card
        value={card}
        style={{
          width: "28%",
          height: "80%",
          margin: "1%",
          flex: "0 0 auto"
        }}
      />
    ))}
  </div>
));

class Learn extends React.Component {
  state = {
    examples: [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        {this.state.examples.map(ex => (
          <Example cards={ex} />
        ))}
        <Button
          size="large"
          className={classes.button}
          onClick={() => alert("click")}
        >
          Add example
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Learn);
