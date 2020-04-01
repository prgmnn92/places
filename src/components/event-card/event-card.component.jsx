import React from "react";
import { Paper } from "@material-ui/core";

import "./event-card.styles.scss";

const EventCard = ({ event }) => {
  return (
    <Paper className="event-card" elevation={3}>
      <h3>{event.title}</h3>
      <span className="small-text">{event.text}</span>
    </Paper>
  );
};

export default EventCard;
