import React, { useState } from "react";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import { auth } from "../../firebase/firebase";
import { setCurrentUser } from "../../redux/actions";

import "./sign-in.styles.scss";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn({ contentHandler, setCurrentUser }) {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    const { email, password } = userCredentials;
    try {
      const { user } = auth.signInWithEmailAndPassword(email, password);
      if (user) {
        setCurrentUser(user);
      }
      setUserCredentials({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log(userCredentials);

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <Grid container className="sign-in" component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="image" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => contentHandler(true)}
                  href="#"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
