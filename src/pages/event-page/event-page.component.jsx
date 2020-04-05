import React from 'react';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';
import EventCardList from '../../components/event-card-list/event-card-list.component';
import GoogleMaps from '../../components/googleMaps/googleMaps.component';
import InfoPaper from '../../components/info-paper/info-paper.component';

const EventPage = ({ user }) => {
	const content = user ? (
		<React.Fragment>
			<Grid className="sidebar" item xs={12} sm={3}>
				<EventCardList />
			</Grid>
			<Grid className="map" item xs={12} sm={9}>
				<GoogleMaps />
			</Grid>
		</React.Fragment>
	) : (
		<InfoPaper>PLEASE SIGN IN</InfoPaper>
	);

	return <React.Fragment>{content}</React.Fragment>;
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(EventPage);
