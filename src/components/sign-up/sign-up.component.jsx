import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import RoomIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { auth, createUserProfileDocument } from "../../firebase/firebase";
import "./sign-up.styles.scss";

export default function SignUp({ toggle }) {
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = userCredentials;

    if (firstName.length < 2 || lastName.length < 2) {
      return alert("Please fill in your name properly");
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email.trim(),
        password
      );

      await createUserProfileDocument(user, { firstName, lastName });

      setUserCredentials({
        firstName: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <Container className="sign-up" component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <RoomIcon />
        </Avatar>
        <Typography style={{ color: "#24323a" }} component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                onChange={handleChange}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                required
                fullWidth
                id="sign-up-email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="sign-up-password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="submit"
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" onClick={toggle} variant="body2">
                Click here to sign in...
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
