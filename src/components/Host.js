import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ image, id, selectedId, changeSelected }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  return (
    <Card
      className={`host ${selectedId === id ? "selected" : null}`}
      onClick={() => {
        changeSelected(id);
      }}
      image={image}
      raised
      link
    />
  );
}

export default Host;
