import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, AppBar, Typography, IconButton, Button, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { auth } from '../../firebase/firebase';

const Navigation = ({ user }) => (
	<Grid item xs={12}>
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
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
	user: state.user
});

export default connect(mapStateToProps)(Navigation);