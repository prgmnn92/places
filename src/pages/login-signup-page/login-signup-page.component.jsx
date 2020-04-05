import React from 'react';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { auth } from '../../firebase/firebase';
import InfoPaper from '../../components/info-paper/info-paper.component';

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

	render() {
		const { user } = this.props;
		return (
			<React.Fragment>
				{user ? (
					<InfoPaper>YOU ARE SIGNED IN</InfoPaper>
				) : (
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<SignIn />
						</Grid>
						<Grid item xs={6}>
							<SignUp />
						</Grid>
					</Grid>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(LoginSignUpPage);
