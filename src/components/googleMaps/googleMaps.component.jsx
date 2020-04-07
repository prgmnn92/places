/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";

import Modal from "../modal/modal.component";

import { setActualPosition, openModal } from "../../redux/actions";
import { getAllEvents } from "../../firebase/firebase";

import "./googleMaps.styles.scss";

let map;

class GoogleMaps extends React.Component {
  componentDidMount() {
    //TODO: implement geocode to receive street name data
    getAllEvents().then((events) => {
      map = initMap(this);
      //const { events } = this.props;

      for (let event of events) {
        let content = `<h1>${event.title}</h1><br/><div>${event.text}</div>`;
        let marker = new google.maps.Marker({
          position: event.position,
          map: map,
        });

        let infowindow = new google.maps.InfoWindow({
          content: content,

          maxWidth: 350,
        });

        google.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Modal mapRef={map} />
        <section id="map" className="map" />
      </React.Fragment>
    );
  }
}

//Helper Functions
function initMap(component) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: {
      lat: 52.216308529631256,
      lng: 10.521203154185534,
    },
  });

  for (let event of component.props.events) {
    let marker = new google.maps.Marker({ position: event.position, map: map });

    var infowindow = new google.maps.InfoWindow({
      content: event.text,

      maxWidth: 350,
    });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });
  }

  map.addListener("click", (event) => {
    console.log(event);
    let position = event.latLng;
    // let position = {
    //   ...event.latLng.lat,
    //   ...event.latLng.lng,
    // };
    let latLng = {
      lat: position.lat(),
      lng: position.lng(),
    };

    // marker erst erstellen wenn openModal fertig ist bzw  create Button gedrückt wurde
    console.log(latLng);
    component.props.setActualPosition(latLng);
    component.props.openModal();
  });
  return map;
}

const mapStateToProps = (state) => ({
  positionOfActualEvent: state.positionOfActualEvent,
  events: state.events,
});

const mapDispatchToProps = (dispatch) => ({
  setActualPosition: (position) => dispatch(setActualPosition(position)),
  openModal: () => dispatch(openModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
