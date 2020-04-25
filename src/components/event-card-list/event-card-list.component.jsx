import React, { useState } from "react";
import { connect } from "react-redux";

import EventCard from "../event-card/event-card.component";

import "./event-card-list.styles.scss";

const EventCardList = ({ events }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="event-card-list">
      <input
        className="search-field"
        placeholder="Search for events"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {events
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter((event) => {
          if (searchValue === "") return true;
          const fullName =
            event.creator.firstName + " " + event.creator.lastName;
          return (
            event.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            fullName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
        .map((event, id) => (
          <EventCard event={event} key={id} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps)(EventCardList);
