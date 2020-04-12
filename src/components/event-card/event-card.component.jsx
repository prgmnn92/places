import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import RoomIcon from '@material-ui/icons/Room';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { removeEvent, enterEvent } from '../../redux/actions';

import './event-card.styles.scss';

const EventCard = ({ user, event, removeEvent, enterEvent }) => {
	return (
		<Paper className="event-card tooltip" elevation={3}>
			<div className="image" />

			<div className="content">
				<h6>
					Erstellt von {event.creator.firstName} {event.creator.lastName}
				</h6>
				<h3>{event.title}</h3>
				<span className="event-description">{event.text}</span>

				<div className="row">
					<span className="geocode">
						<RoomIcon className="room-icon" />
						Example Street 123
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
				</div>
			</div>
			<HighlightOffIcon className="delete-button" onClick={() => removeEvent(event.id)} />
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
	user: state.user
});

const mapDispatchToProps = (dispatch) => ({
	removeEvent: (id) => dispatch(removeEvent(id)),
	enterEvent: (eventId, user) => dispatch(enterEvent(eventId, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
