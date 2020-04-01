import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import GoogleMaps from "./components/googleMaps/googleMaps.component";

import "./App.css";

const Element = () => {
  return <Paper elevation={3}>Test</Paper>;
};

class CardList extends React.Component {
  state = {
    data: [0, 1]
  };

  render() {
    return (
      <div>
        {this.state.data.map((element, id) => (
          <Element key={id} />
        ))}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Grid container className="main">
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className="menuButton"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className="title">
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid className="sidebar" item xs={12} sm={3}>
          <CardList />
        </Grid>
        <Grid className="map" item xs={12} sm={9}>
          <GoogleMaps />
        </Grid>
      </Grid>
    );
  }
}

export default App;
