import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import EventCardList from "../../components/event-card-list/event-card-list.component";
import GoogleMaps from "../../components/googleMaps/googleMaps.component";
import "./event-page.styles.scss";

const EventPage = ({ user }) => {
  const history = useHistory();
  const content = user ? (
    <React.Fragment>
      <Grid className="sidebar" item xs={12} sm={3} xl={2}>
        <EventCardList />
      </Grid>
      <Grid className="map" item xs={12} sm={9} xl={10}>
        <GoogleMaps />
      </Grid>
    </React.Fragment>
  ) : (
    history.push("/login")
  );

  return <React.Fragment>{content}</React.Fragment>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(EventPage);
