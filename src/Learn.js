import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import Card from "./Card";
import { getRandomTriplet } from "./api";

const styles = () => ({
  main: {
    backgroundColor: "#fff",
    height: "100%",
    width: "auto",
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
    width: 200,
    flex: "0 0 100px",
    margin: 4,
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#555"
  },
  list: {
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  listTitle: {
    textAlign: "center",
    alignSelf: "center"
  },
  exampleListsContainer: {
    flex: 1,
    width: "calc(100% - 8px)",
    padding: 4,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    overflow: "hidden"
  },
  bottomContainer: {
    margin: 4,
    padding: 8,
    width: "calc(100% - 24px)",
    backgroundColor: "#eef",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  bottom: {
    maxWidth: 666,
    margin: "auto",
    width: "100%"
  }
});

const Example = withStyles(styles)(({ cards, classes }) => (
  <Paper className={classes.example}>
    {cards.map((card, idx) => (
      <Card
        key={idx}
        value={card}
        style={{
          height: "94%",
          margin: "2%",
          flex: "1 1 0px",
          border: "solid black 1px"
        }}
      />
    ))}
  </Paper>
));

const ExampleList = withStyles(styles)(({ examples, positive, classes }) => (
  <div
    className={classes.list}
    style={{
      backgroundColor: positive ? "#dfd" : "#fdd",
      marginRight: positive ? 4 : 0,
      marginLeft: positive ? 0 : 4
    }}
  >
    {positive && <h2 className={classes.listTitle}>Correct Examples</h2>}
    {!positive && <h2 className={classes.listTitle}>Incorrect Examples</h2>}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        alignContent: "space-evenly",
        overflow: "auto"
      }}
    >
      {examples.map((ex, i) => (
        <Example cards={ex} key={i} />
      ))}
    </div>
  </div>
));

const BottomBox = withStyles(styles)(
  ({ correct, handleClick, setRule, rule, classes }) => (
    <div className={classes.bottom}>
      {!correct && (
        <div>
          <p>
            Find a rule that distinguishes between the correct and incorrect
            examples
          </p>
          <TextField
            label="Rule"
            multiline
            style={{ width: "100%" }}
            variant="outlined"
            margin="dense"
            rowsMax={5}
            onChange={e => setRule(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClick(true)}
          >
            Submit
          </Button>
        </div>
      )}
      {correct && (
        <div>
          <TextField
            label="Your rule"
            multiline
            style={{ width: "100%" }}
            variant="outlined"
            margin="dense"
            value={rule}
            rowsMax={5}
          />
          <p>
            Make sure that your rule classifies positively all
            <b> correct examples </b>
            and negatively all <b>incorrect examples</b>.
          </p>
          <span>Is your rule correct?</span>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClick(true)}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClick(false)}
          >
            No
          </Button>
        </div>
      )}
    </div>
  )
);

class Learn extends React.Component {
  state = {
    rule: "",
    correct: false,
    sets: [],
    notsets: []
  };

  componentDidMount = () => {
    const { sets, notsets } = this.state;
    const set = getRandomTriplet(true);
    const notset = getRandomTriplet(false);
    this.setState({ sets: [...sets, set], notsets: [...notsets, notset] });
  };

  handleClick = correct => {
    if (correct) {
      const { sets, notsets } = this.state;
      const set = getRandomTriplet(true);
      const notset = getRandomTriplet(false);
      this.setState({ sets: [...sets, set], notsets: [...notsets, notset] });
    }
    this.setState({ correct });
  };

  render() {
    const { classes } = this.props;
    const { rule, correct } = this.state;
    return (
      <div className={classes.main}>
        <div className={classes.exampleListsContainer}>
          <ExampleList examples={this.state.sets} positive />
          <ExampleList examples={this.state.notsets} />
        </div>
        <div className={classes.bottomContainer}>
          <BottomBox
            rule={rule}
            correct={correct}
            handleClick={this.handleClick}
            setRule={rule => this.setState({ rule })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Learn);
