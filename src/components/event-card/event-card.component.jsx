import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import './event-card.styles.scss';

const EventCard = ({ event }) => {
	return (
		<Paper className="event-card" elevation={3}>
			<div className="image" />
			<div className="content" />
		</Paper>
	);
};

export default EventCard;
