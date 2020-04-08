import React from "react";
import { connect } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { removeEvent } from "../../redux/actions";

import "./event-card.styles.scss";

const EventCard = ({ event, removeEvent }) => {
  return (
    <Paper className="event-card" elevation={3}>
      <div className="image" />

      <div className="content">
        <h6>Event Card</h6>
        <h3>{event.title}</h3>
        <span className="event-description">{event.text}</span>
        <div className="row">
          <span className="geocode">
            <RoomIcon className="room-icon" />
            Example Street 123
          </span>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className="attend-button"
            endIcon={<CheckIcon />}
          >
            Enter
          </Button>
        </div>
      </div>
      <HighlightOffIcon
        className="delete-button"
        onClick={() => removeEvent(event.id)}
      />
    </Paper>
  );
};

const mapDispatchToProps = (disptach) => ({
  removeEvent: (id) => disptach(removeEvent(id)),
});

export default connect(null, mapDispatchToProps)(EventCard);
