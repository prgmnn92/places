import React from "react";

import { Grid } from "@material-ui/core";
import EventCardList from "../../components/event-card-list/event-card-list.component";
import GoogleMaps from "../../components/googleMaps/googleMaps.component";

const EventPage = () => (
  <React.Fragment>
    <Grid className="sidebar" item xs={12} sm={3}>
      <EventCardList />
    </Grid>
    <Grid className="map" item xs={12} sm={9}>
      <GoogleMaps />
    </Grid>
  </React.Fragment>
);

export default EventPage;
