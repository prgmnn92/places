import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

class LoginSignUpPage extends React.Component {
  state = {
    showSignUp: false
  };

  contentHandler = state => {
    this.setState({ showSignUp: state });
  };

  render() {
    const content = this.state.showSignUp ? (
      <SignUp contentHandler={this.contentHandler} />
    ) : (
      <SignIn contentHandler={this.contentHandler} />
    );

    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default LoginSignUpPage;
