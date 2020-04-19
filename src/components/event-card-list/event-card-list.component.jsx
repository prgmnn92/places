import React from "react";
import { connect } from "react-redux";

import EventCard from "../event-card/event-card.component";

import "./event-card-list.styles.scss";

class EventCardList extends React.Component {
  render() {
    const { events } = this.props;
    return (
      <div className="event-card-list">
        {events
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((event, id) => (
            <EventCard event={event} key={id} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps)(EventCardList);
