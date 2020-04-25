/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';

import eventMarker from '../../assets/marker.svg';
import currentPositionMarkerIcon from '../../assets/currentPosition.svg';

import Modal from '../modal/modal.component';
import { setActualPosition, openModal } from '../../redux/actions';
import { getAllEvents } from '../../firebase/firebase';
import { parseDate } from '../../utils/utils';

import './googleMaps.styles.scss';

//let map;

class GoogleMaps extends React.Component {
	componentDidMount() {
		//TODO: implement geocode to receive street name data

		getAllEvents().then((events) => {
			map = initMap(this);
			//const { events } = this.props;

			const options = {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			};

			for (let event of events) {
				let content = `<div class="info-window">
        <h1>${event.title}</h1>
        <p class="text">${event.text}</p>
        <p class="date">${parseDate(event.date).toLocaleDateString('en-EN', options)}</p>
        <p class="time">from ${('00' + parseDate(event.startTime).getHours()).slice(-2)}:
        ${('00' + parseDate(event.startTime).getMinutes()).slice(-2)} to 
        ${('00' + parseDate(event.endTime).getHours()).slice(-2)}:
        ${('00' + parseDate(event.endTime).getMinutes()).slice(-2)}</p>
        </div>`;
				let marker = new google.maps.Marker({
					position: event.position,
					map: map,
					icon: eventMarker
				});

				let infowindow = new google.maps.InfoWindow({
					content: content,
					maxWidth: 350
				});

				google.maps.event.addListener(marker, 'click', () => {
					infowindow.open(map, marker);
				});
			}
		});

		//	this.setCurrentPosition(map);
	}

	setCurrentPosition = async (map) => {
		let iWindow = new google.maps.InfoWindow();
		let currentPositionMarker = new google.maps.Marker({
			icon: currentPositionMarkerIcon
		});

		console.log('test');

		const handleLocationError = (browserHasGeolocation, iWindow, pos) => {
			iWindow.setPosition(pos);
			iWindow.setContent(
				browserHasGeolocation
					? 'Error: The Geolocation service failed.'
					: "Error: Your browser doesn't support geolocation."
			);
			iWindow.open(map);
		};

		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					currentPositionMarker.setPosition(pos);

					iWindow.setContent('Location found.');

					google.maps.event.addListener(currentPositionMarker, 'click', () => {
						iWindow.open(map, currentPositionMarker);
					});

					map.setCenter(pos);
				},
				() => {
					handleLocationError(true, iWindow, map.getCenter());
				}
			);
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, iWindow, map.getCenter());
		}
	};

	render() {

    const map = function initMap(this) {
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {
          lat: 52.216308529631256,
          lng: 10.521203154185534
        }
      });
    
      for (let event of component.props.events) {
        let marker = new google.maps.Marker({
          position: event.position,
          map: map,
          icon: eventMarker
        });
    
        var infowindow = new google.maps.InfoWindow({
          content: event.text,
    
          maxWidth: 350
        });
    
        google.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });
      }
    
      map.addListener('click', (event) => {
        console.log(event);
        let position = event.latLng;
    
        let latLng = {
          lat: position.lat(),
          lng: position.lng()
        };
    
        component.props.setActualPosition(latLng);
        component.props.openModal();
      });
      return map;
    };

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
	let map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: {
			lat: 52.216308529631256,
			lng: 10.521203154185534
		}
	});

	for (let event of component.props.events) {
		let marker = new google.maps.Marker({
			position: event.position,
			map: map,
			icon: eventMarker
		});

		var infowindow = new google.maps.InfoWindow({
			content: event.text,

			maxWidth: 350
		});

		google.maps.event.addListener(marker, 'click', () => {
			infowindow.open(map, marker);
		});
	}

	map.addListener('click', (event) => {
		console.log(event);
		let position = event.latLng;

		let latLng = {
			lat: position.lat(),
			lng: position.lng()
		};

		component.props.setActualPosition(latLng);
		component.props.openModal();
	});
	return map;
}

const mapStateToProps = (state) => ({
	positionOfActualEvent: state.positionOfActualEvent,
	events: state.events
});

const mapDispatchToProps = (dispatch) => ({
	setActualPosition: (position) => dispatch(setActualPosition(position)),
	openModal: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
