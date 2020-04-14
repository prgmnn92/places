import React from "react";
import { connect } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { removeEvent, enterEvent } from "../../redux/actions";

import "./event-card.styles.scss";

const EventCard = ({ user, event, removeEvent, enterEvent }) => {
  const { startTime, endTime, date } = event;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Paper className="event-card tooltip" elevation={3}>
      {/* <div className="image" /> */}

      <div className="content">
        <h6>
          Created by {event.creator.firstName} {event.creator.lastName}
        </h6>
        <h3>{event.title}</h3>
        <span className="event-description">
          {event.text.substring(0, 150) +
            (event.text.length > 150 ? "..." : "")}
        </span>

        <div className="row">
          <RoomIcon className="room-icon" />
          <span className="geocode">
            {/* Example Street 58 */}
            <br />
            {date.toDate().toLocaleDateString("en-EN", options)}
          </span>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className="attend-button"
            onClick={() => enterEvent(event.id, user)}
            endIcon={<CheckIcon />}
          >
            Enter
          </Button>
          <span className="time">
            {("00" + startTime.toDate().getHours()).slice(-2)}:
            {("00" + startTime.toDate().getMinutes()).slice(-2)} -{" "}
            {("00" + endTime.toDate().getHours()).slice(-2)}:
            {("00" + endTime.toDate().getMinutes()).slice(-2)}
          </span>
        </div>
      </div>
      <HighlightOffIcon
        className="delete-button"
        onClick={() => removeEvent(event.id)}
      />
      <span className="tooltiptext">
        {event.participants.map((participant, id) => {
          return (
            <p className="participant" key={id}>
              {participant.firstName} {participant.lastName}
            </p>
          );
        })}
      </span>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
  enterEvent: (eventId, user) => dispatch(enterEvent(eventId, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
