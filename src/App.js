import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

import EventPage from "./pages/event-page/event-page.component";
import LoginSignUpPage from "./pages/login-signup-page/login-signup-page.component";

import { auth, createUserProfileDocument } from "./firebase/firebase";

import "./App.css";

class App extends React.Component {
  state = {
    currentUser: null
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
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
              {this.state.currentUser ? (
                <Button color="inherit" onClick={() => auth.signOut()}>
                  SIGN OUT
                </Button>
              ) : (
                <Button color="inherit">
                  <Link className="link" to="/login">
                    SIGN IN
                  </Link>
                </Button>
              )}
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
