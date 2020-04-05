import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import EventPage from './pages/event-page/event-page.component';
import LoginSignUpPage from './pages/login-signup-page/login-signup-page.component';
import Navigation from './components/navigation/navigation.component';

import { auth, createUserProfileDocument } from './firebase/firebase';
import { setCurrentUser } from './redux/actions';

import './App.css';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<Grid container className="main">
				<Navigation />
				<Switch>
					<Route exact path="/" component={EventPage} />
					<Route exact path="/login" component={LoginSignUpPage} />
				</Switch>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
