import * as React from "react";
import Grid from "@material-ui/core/Grid";

import Card from "./Card";

export default ({ cards }) => (
  <Grid container spacing={16} style={{ height: "65vh" }}>
    {cards.map(card => (
      <Grid key={card.value} item xs={4}>
        <Card {...card} />
      </Grid>
    ))}
  </Grid>
);
