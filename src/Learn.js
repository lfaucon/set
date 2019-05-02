import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import Card from "./Card";
import { getRandomTriplet } from "./api";

import styles from "./styles";

const POSITIVE_EXAMPLES = [
  [2, 0, 1],
  [0, 0, 0],
  [1, 1, 1],
  [1, 2, 0],
  [28, 28, 28],
  [54, 55, 56],
  [56, 27, 1],
  [29, 56, 2],
  [54, 54, 54],
  [55, 2, 27]
];

const NEGATIVE_EXAMPLES = [
  [2, 1, 1],
  [0, 0, 2],
  [0, 1, 0],
  [1, 1, 2],
  [28, 1, 28],
  [0, 55, 56],
  [29, 27, 1],
  [29, 56, 29],
  [0, 54, 56],
  [29, 28, 2]
];

const POSITIVE_EXAMPLES2 = [
  [1, 0, 2],
  [27, 0, 54],
  [56, 28, 0],
  [54, 54, 54],
  [1, 28, 55],
  [27, 28, 29],
  [1, 56, 27],
  [29, 29, 29],
  [28, 55, 1],
  [55, 56, 54]
];

const NEGATIVE_EXAMPLES2 = [
  [1, 0, 29],
  [27, 1, 54],
  [29, 28, 0],
  [54, 27, 54],
  [1, 28, 1],
  [29, 28, 29],
  [1, 55, 27],
  [29, 29, 2],
  [27, 55, 56],
  [54, 56, 54]
];

let POSITIVE_IDX = 0;
let NEGATIVE_IDX = 0;
const getHandPickedTriplet = isSet => {
  if (isSet) {
    POSITIVE_IDX += 1;
    return POSITIVE_EXAMPLES[POSITIVE_IDX - 1];
  } else {
    NEGATIVE_IDX += 1;
    return NEGATIVE_EXAMPLES[NEGATIVE_IDX - 1];
  }
};

const Intro = withStyles(styles)(({ start, classes }) => (
  <div className={classes.introContainer}>
    <h2>Inductive Learning</h2>
    <p>
      You will be shown several triplets of cards (similar to the two triplets
      below). There is a rule that you must discover by yourself that separates
      between correct and incorrect triplets.
    </p>
    <div className={classes.exampleListsContainer}>
      <Example cards={[0, 1, 2]} styleName={classes.exampleInIntro} />
      <Example cards={[27, 27, 0]} styleName={classes.exampleInIntro} />
    </div>
    <Button color="primary" onClick={start}>
      Got it!
    </Button>
  </div>
));

const Example = withStyles(styles)(({ cards, classes, styleName }) => (
  <Paper className={styleName || classes.example}>
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

const ExampleList = withStyles(styles)(({ examples, positive, classes }) => {
  const n = examples.length;
  return (
    <div
      className={classes.list}
      style={{
        backgroundColor: positive ? "#dfd" : "#fdd",
        marginRight: positive ? 4 : 0,
        marginLeft: positive ? 0 : 4
      }}
    >
      {positive && (
        <h2 className={classes.listTitle}>Correct triplets ( {n} / 10 )</h2>
      )}
      {!positive && (
        <h2 className={classes.listTitle}>Incorrect triplets ( {n} / 10 )</h2>
      )}
      <div className={classes.examplesList}>
        {examples.map((ex, i) => (
          <Example cards={ex} key={i} />
        ))}
      </div>
    </div>
  );
});

const BottomBox = withStyles(styles)(
  ({ correct, handleClick, setRule, rule, step, classes }) => {
    if (step === 10) {
      return (
        <div className={classes.bottom}>
          <TextField
            label="Your rule"
            multiline
            style={{ width: "100%" }}
            InputProps={{ classes: { root: classes.nocursor } }}
            variant="outlined"
            margin="dense"
            value={rule}
            rowsMax={5}
          />
          <h2>Activity Completed!</h2>
        </div>
      );
    } else if (!correct) {
      return (
        <div className={classes.bottom}>
          <span>
            Find a rule that distinguishes between the correct and incorrect
            examples
          </span>
          <TextField
            label="Rule"
            multiline
            style={{ width: "100%" }}
            defaultValue={rule}
            variant="outlined"
            margin="dense"
            rowsMax={5}
            onChange={e => setRule(e.target.value)}
          />
          <Button
            disabled={!rule}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleClick(true)}
          >
            Submit
          </Button>
        </div>
      );
    } else {
      return (
        <div className={classes.bottom}>
          <TextField
            label="Your rule"
            multiline
            style={{ width: "100%" }}
            InputProps={{ classes: { root: classes.nocursor } }}
            variant="outlined"
            margin="dense"
            value={rule}
            rowsMax={5}
          />
          <span>
            Make sure that your rule classifies positively all
            <b> correct examples </b>
            and negatively all <b>incorrect examples</b>.
          </span>
          <br />
          <span>Is your rule correct?</span>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClick(true)}
            color="primary"
          >
            Yes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClick(false)}
            color="primary"
          >
            No
          </Button>
        </div>
      );
    }
  }
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
    // const set = getRandomTriplet(true);
    // const notset = getRandomTriplet(false);
    const set = getHandPickedTriplet(true);
    const notset = getHandPickedTriplet(false);
    this.setState({ sets: [...sets, set], notsets: [...notsets, notset] });
  };

  handleClick = correct => {
    if (correct) {
      const { sets, notsets } = this.state;
      // const set = getRandomTriplet(true);
      // const notset = getRandomTriplet(false);
      const set = getHandPickedTriplet(true);
      const notset = getHandPickedTriplet(false);
      this.setState({ sets: [...sets, set], notsets: [...notsets, notset] });
    }
    this.setState({ correct });
  };

  render() {
    const { classes } = this.props;
    const { rule, correct, started } = this.state;
    if (!started) {
      return (
        <div className={classes.main}>
          <Intro start={() => this.setState({ started: true })} />
        </div>
      );
    }
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
            step={this.state.sets.length}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Learn);
