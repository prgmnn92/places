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
  state = {
    participate: false,
  };

  componentDidMount() {
    const { user, event } = this.props;
    this.checkParticipate(user, event);
  }

  parseDate = (date) => {
    try {
      const newDate = date.toDate();
      return newDate;
    } catch (error) {
      return date;
    }
  };
  checkParticipate = (user, event) => {
    const check = event.participants.map((participant) => {
      console.log("parti_id", participant.id);
      console.log("user_id", user);
      if (participant.id === user.uid) {
        return true;
      }
      return false;
    });
    if (check.includes(true)) {
      return this.setState({ participate: true });
    }
  };

  // console.log("date", typeof date.toDate());
  render() {
    const { user, event, removeEvent, enterEvent } = this.props;
    const { participate } = this.state;

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
              {this.parseDate(event.date).toLocaleDateString("en-EN", options)}
            </span>
            <Button
              variant="contained"
              size="small"
              color={participate ? "secondary" : "primary"}
              className="attend-button"
              onClick={() =>
                participate
                  ? leaveEvent(event.id, user)
                  : enterEvent(event.id, user)
              }
              endIcon={participate ? <ExitToAppIcon /> : <CheckIcon />}
            >
              {participate ? "Leave" : "Enter"}
            </Button>
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
