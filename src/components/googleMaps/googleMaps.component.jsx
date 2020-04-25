/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";

import currentPositionMarkerIcon from "../../assets/currentPosition.svg";

import Modal from "../modal/modal.component";
import { setActualPosition, openModal } from "../../redux/actions";
import { getAllEvents } from "../../firebase/firebase";
import { createMarkerWithInfo } from "../../utils/utils";

import "./googleMaps.styles.scss";

class GoogleMaps extends React.Component {
  map = null;

  componentDidMount() {
    //TODO: implement geocode to receive street name data
    const { setActualPosition, openModal } = this.props;

    getAllEvents().then((events) => {
      this.map = initMap();
      this.setCurrentPosition();

      this.map.addListener("click", (event) => {
        let position = event.latLng;

        let latLng = {
          lat: position.lat(),
          lng: position.lng(),
        };

        setActualPosition(latLng);
        openModal();
      });

      for (let event of events) {
        createMarkerWithInfo(event.position, this.map, event);
      }
      // this.setCurrentPosition(this.map);
    });
  }

  setCurrentPosition = async () => {
    let iWindow = new google.maps.InfoWindow();

    const handleLocationError = (browserHasGeolocation, iWindow, pos) => {
      iWindow.setPosition(pos);
      iWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      iWindow.open(this.map);
    };

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          let currentPositionMarker = new google.maps.Marker({
            position: pos,
            map: this.map,
            icon: currentPositionMarkerIcon,
          });

          //currentPositionMarker.setPosition(pos);
          iWindow.setContent("Your location.");

          google.maps.event.addListener(currentPositionMarker, "click", () => {
            iWindow.open(this.map, currentPositionMarker);
          });

          this.map.setCenter(pos);
        },
        () => {
          handleLocationError(true, iWindow, this.map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, iWindow, this.map.getCenter());
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal mapRef={this.map} />
        <section id="map" className="map" />
      </React.Fragment>
    );
  }
}

//Helper Functions
function initMap() {
  return new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: {
      lat: 52.268875,
      lng: 10.52677,
    },
  });
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
