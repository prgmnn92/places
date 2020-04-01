/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";

import Modal from "../modal/modal.component";

import { setActualPosition, openModal } from "../../redux/actions";

import "./googleMaps.styles.scss";

class GoogleMaps extends React.Component {
  componentDidMount() {
    let map = initMap(this);
    const { events } = this.props;
    console.log(events);

    for (let event of events) {
      let content = `<h1>${event.title}</h1><br/><div>${event.text}</div>`;
      let marker = new google.maps.Marker({
        position: event.position,
        map: map
      });

      var infowindow = new google.maps.InfoWindow({
        content: content,

        maxWidth: 350
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let map = initMap(this);
    const { events } = this.props;
    console.log(events);

    for (let event of events) {
      let content = `<h1>${event.title}</h1><br/><div>${event.text}</div>`;
      let marker = new google.maps.Marker({
        position: event.position,
        map: map
      });

      var infowindow = new google.maps.InfoWindow({
        content: content,

        maxWidth: 350
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    }
    console.log(nextProps.events !== this.props.events);
    return nextProps.events !== this.props.events;
  }

  render() {
    return (
      <React.Fragment>
        <Modal />
        <section id="map" className="map"></section>
      </React.Fragment>
    );
  }
}

//Helper Functions
function initMap(component) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: {
      lat: 34.04924594193164,
      lng: -118.24104309082031
    }
  });

  for (let event of component.props.events) {
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

    // marker erst erstellen wenn openModal fertig ist bzw  create Button gedrückt wurde
    //let marker = new google.maps.Marker({ position: position, map: map });
    console.log(position);
    component.props.setActualPosition(position);
    component.props.openModal();
  });
  return map;
}

const mapStateToProps = state => ({
  positionOfActualEvent: state.positionOfActualEvent,
  events: state.events
});

const mapDispatchToProps = dispatch => ({
  setActualPosition: position => dispatch(setActualPosition(position)),
  openModal: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
