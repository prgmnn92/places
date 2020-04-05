import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { auth } from "../../firebase/firebase";

class LoginSignUpPage extends React.Component {
  state = {
    showSignUp: false,
    userIsSignedIn: false
  };

  componentDidMount() {
    let user = auth.currentUser;

    console.log(user);

    if (user) {
      // User is signed in.
      this.state.setState({
        userIsSignedIn: true
      });
    } else {
      // No user is signed in.
    }
  }

  contentHandler = state => {
    this.setState({ showSignUp: state });
  };

  render() {
    const { showSignUp, userIsSignedIn } = this.state;
    const content =
      showSignUp && !userIsSignedIn ? (
        <SignUp contentHandler={this.contentHandler} />
      ) : (
        <SignIn contentHandler={this.contentHandler} />
      );

    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default LoginSignUpPage;
