import React from "react";
import { connect } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { removeEvent, enterEvent, leaveEvent } from "../../redux/actions";

import "./event-card.styles.scss";

class EventCard extends React.Component {
  parseDate = (date) => {
    try {
      const newDate = date.toDate();
      return newDate;
    } catch (error) {
      return date;
    }
  };

  render() {
    const { user, event, removeEvent, enterEvent, leaveEvent } = this.props;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const leaveOrEnterButton =
      typeof event.participants[user.id] !== undefined ? (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          className="attend-button"
          onClick={() => leaveEvent(event.id, user)}
          endIcon={<ExitToAppIcon />}
        >
          Leave
        </Button>
      ) : (
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
      );

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
              {this.parseDate(event.date).toLocaleDateString("en-EN", options)}
            </span>
            {leaveOrEnterButton}
            <span className="time">
              {("00" + this.parseDate(event.startTime).getHours()).slice(-2)}:
              {("00" + this.parseDate(event.startTime).getMinutes()).slice(-2)}{" "}
              - {("00" + this.parseDate(event.endTime).getHours()).slice(-2)}:
              {("00" + this.parseDate(event.endTime).getMinutes()).slice(-2)}
            </span>
          </div>
        </div>
        <HighlightOffIcon
          className="delete-button"
          onClick={() => removeEvent(event.id)}
        />
        <span className="tooltiptext">
          {Object.keys(event.participants).map((participant) => {
            return (
              <p
                className="participant"
                key={event.participants[participant].id}
              >
                {event.participants[participant].firstName}{" "}
                {event.participants[participant].lastName}
              </p>
            );
          })}
        </span>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
  enterEvent: (eventId, user) => dispatch(enterEvent(eventId, user)),
  leaveEvent: (eventId, user) => dispatch(leaveEvent(eventId, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
