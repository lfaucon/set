import * as React from "react";

import Card from "./Card";

export default ({ cards }) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center"
    }}
  >
    {cards.map(card => (
      <Card
        key={card.value}
        {...card}
        style={{
          width: "29%",
          height: "22%",
          margin: "1%",
          flex: "0 0 auto"
        }}
      />
    ))}
  </div>
);
