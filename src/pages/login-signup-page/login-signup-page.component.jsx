import React from "react";

import { Grid } from "@material-ui/core";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./login-signup.page.styles.scss";

const LoginSignUpPage = () => (
  <React.Fragment>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      className="login-sign-up-page"
    >
      <Grid className="sign-in" item xs={6}>
        <SignIn />
      </Grid>
      <Grid className="sign-up" item xs={6}>
        <SignUp />
      </Grid>
    </Grid>
  </React.Fragment>
);

export default LoginSignUpPage;
