/* eslint-disable no-undef */
import React from "react";

import Modal from "../modal/modal.component";

import "./googleMaps.styles.scss";

let events = [
  {
    title: "testz",
    text: "text",
    position: {
      lat: 34.04924594193164,
      lng: -117.24104309082031
    }
  }
];

class GoogleMaps extends React.Component {
  state = {
    createEvent: false,
    events: [
      {
        title: "testz",
        text: "text",
        position: {
          lat: 34.04924594193164,
          lng: -117.24104309082031
        }
      },
      {
        title: "test",
        text: "text",
        position: {
          lat: 34.04924594193164,
          lng: -119.24104309082031
        }
      }
    ]
  };

  componentDidMount() {
    initMap(this);
  }

  createEventCancelHandler = () => {
    this.setState({
      createEvent: false
    });
  };

  openCreateEventModal = () => {
    this.setState({
      createEvent: true
    });
  };

  createEvent = (title, text, position) => {
    let event = {
      title: title,
      text: text,
      position: position
    };

    this.setState({
      ...this.state,
      events: [...this.state.events, events]
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.state.createEvent}
          modalClosed={this.createEventCancelHandler}
          createEvent={this.createEvent}
        />

        <section
          // onClick={this.openCreateEventModal}
          id="map"
          className="map"
        ></section>
      </React.Fragment>
    );
  }
}

//Helper Functions
function initMap(component) {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: {
      lat: 34.04924594193164,
      lng: -118.24104309082031
    }
  });

  for (let event of component.state.events) {
    let marker = new google.maps.Marker({ position: event.position, map: map });

    var infowindow = new google.maps.InfoWindow({
      content: event.text,

      maxWidth: 350
    });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });
  }

  map.addListener("click", event => {
    let position = event.latLng;

    let marker = new google.maps.Marker({ position: position, map: map });
    component.setState({ createEvent: true });
  });
}

export default GoogleMaps;
