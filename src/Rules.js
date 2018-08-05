import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import CardSET from "./Card";

const cardStyle = {
  width: "30%",
  margin: "1%",
  flex: "1 1 auto",
  borderRadius: "6%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const Rule0 = () => (
  <Card style={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        The cards
      </Typography>
      <Typography component="p">
        Cards have 4 carateristics and each caracteristic has 3 options:
      </Typography>
      <ul>
        <Typography component="li">
          The shape: oval, diamond, or squiggle
        </Typography>
        <Typography component="li">The color: red, blue, or green</Typography>
        <Typography component="li">
          The filling: empty, full, or striped
        </Typography>
        <Typography component="li">The number: 1, 2, or 3</Typography>
      </ul>
    </CardContent>
    <CardContent
      style={{ height: "30%", display: "flex", flexDirection: "row" }}
    >
      <CardSET value={80} style={cardStyle} />
      <CardSET value={0} style={cardStyle} />
      <CardSET value={40} style={cardStyle} />
    </CardContent>
  </Card>
);

const Rule1 = () => (
  <Card style={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        The rule
      </Typography>
      <Typography gutterBottom component="p">
        A SET is three cards that respects the following rule:
      </Typography>
      <Typography component="em" align="center">
        If two cards share a common caracteristic, the third card must have it
        too
      </Typography>
    </CardContent>
  </Card>
);

const Rule2 = () => (
  <Card style={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        Example 1:
      </Typography>
      <Typography gutterBottom component="p">
        Below is a correct SET. The first two cards have in common the shape and
        the number. The third one also share this carateristic. There is no
        other common caracteristic.
      </Typography>
    </CardContent>
    <CardContent
      style={{ height: "30%", display: "flex", flexDirection: "row" }}
    >
      <CardSET value={0} style={cardStyle} />
      <CardSET value={4} style={cardStyle} />
      <CardSET value={8} style={cardStyle} />
    </CardContent>
  </Card>
);

const Rule3 = () => (
  <Card style={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        Example 2:
      </Typography>
      <Typography gutterBottom component="p">
        Below is not a correct SET. The first two share the same shape which is
        also found in the third card. However the rule has to be respected for
        each pair of card and each caracteristic. Here the last two share the
        number 3 which the first does not have.
      </Typography>
    </CardContent>
    <CardContent
      style={{ height: "30%", display: "flex", flexDirection: "row" }}
    >
      <CardSET value={42} style={cardStyle} />
      <CardSET value={52} style={cardStyle} />
      <CardSET value={53} style={cardStyle} />
    </CardContent>
  </Card>
);

const Rule4 = () => (
  <Card style={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        Example 3:
      </Typography>
      <Typography gutterBottom component="p">
        Below is a correct SET. There is no two card sharing a common
        caracteristic, thus the rule is true by default.
      </Typography>
    </CardContent>
    <CardContent
      style={{ height: "30%", display: "flex", flexDirection: "row" }}
    >
      <CardSET value={80} style={cardStyle} />
      <CardSET value={0} style={cardStyle} />
      <CardSET value={40} style={cardStyle} />
    </CardContent>
  </Card>
);

const Rule5 = () => (
  <Card style={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        The End
      </Typography>
      <Typography gutterBottom component="p">
        You can now play the game in the tabs: LEARN, EASY, MEDIUM and HARD
      </Typography>
    </CardContent>
  </Card>
);

const tutorialSteps = [
  <Rule0 />,
  <Rule1 />,
  <Rule2 />,
  <Rule3 />,
  <Rule4 />,
  <Rule5 />
];

const styles = () => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  content: {
    height: "100%",
    flex: "1 1 auto"
  },
  mobileStepper: {
    backgroundColor: "white"
  }
});

class TextMobileStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Paper className={classes.content}>{tutorialSteps[activeStep]}</Paper>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
