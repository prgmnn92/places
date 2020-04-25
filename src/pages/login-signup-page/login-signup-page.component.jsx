import React, { useState } from "react";

import { Grid, Paper } from "@material-ui/core";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./login-signup.page.styles.scss";

const LoginSignUpPage = () => {
  const [inputToggle, setInputToggle] = useState(true);

  const SignInOrSignUpHandler = () => {
    setInputToggle(!inputToggle);
  };

  return (
    <React.Fragment>
      <Grid
        component={Paper}
        elevation={6}
        container
        className="login-sign-up-page"
      >
        <Grid className="background" item xs={12} lg={6}></Grid>
        <Grid className="input" item xs={12} lg={6}>
          {inputToggle ? (
            <SignIn toggle={SignInOrSignUpHandler} />
          ) : (
            <SignUp toggle={SignInOrSignUpHandler} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginSignUpPage;
