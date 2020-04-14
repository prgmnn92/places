import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, AppBar, Typography, Button, Toolbar } from "@material-ui/core";

import { auth } from "../../firebase/firebase";

import "./navigation.styles.scss";

const Navigation = ({ user }) => (
  <Grid className="navigation" item xs={12}>
    <AppBar position="static">
      <Toolbar>
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
  </Grid>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navigation);
