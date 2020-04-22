import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import RoomIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";

import { auth } from "../../firebase/firebase";
import { setCurrentUser } from "../../redux/actions";

import "./sign-in.styles.scss";

function SignIn({ setCurrentUser, toggle }) {
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    console.clear();
    const { email, password } = userCredentials;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setCurrentUser(res.user);

        history.push("/");
      })
      .catch((error) => alert("There was an error: " + error.message));

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
    <Container className="sign-in" component="main" maxWidth="xs">
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12}>
        <div className="paper">
          <Avatar className="avatar">
            <RoomIcon />
          </Avatar>
          <Typography style={{ color: "#24323a" }} component="h1" variant="h5">
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
                <Link href="#" onClick={toggle} variant="body2">
                  Click here to sign up...
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
