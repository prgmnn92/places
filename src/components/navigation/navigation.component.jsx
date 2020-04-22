import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  IconButton,
  Hidden,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import EventCardList from "../event-card-list/event-card-list.component";
import { auth } from "../../firebase/firebase";

import "./navigation.styles.scss";

const Navigation = ({ user }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <React.Fragment>
      <AppBar
        className="navbar"
        position="static"
        style={{ background: "#24323a" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={"menu-button"}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            <Link className="link" to="/">
              PLACES
            </Link>
          </Typography>
          {user ? (
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
      <nav className={"drawer"} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={Container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: "drawer-paper",
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {user ? <EventCardList /> : null}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navigation);
