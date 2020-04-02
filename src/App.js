import React from "react";
import { Switch, Route } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

import EventPage from "./pages/event-page/event-page.component";
import LoginSignUpPage from "./pages/login-signup-page/login-signup-page.component";

import "./App.css";

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
        <Switch>
          <Route exact path="/" component={EventPage} />
          <Route exact path="/login" component={LoginSignUpPage} />
        </Switch>
      </Grid>
    );
  }
}

export default App;
