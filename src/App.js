import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import GoogleMaps from "./components/googleMaps/googleMaps.component";

import "./App.css";

const useStyles = makeStyles(theme => ({
  main: {
    height: "100%"
  },

  sidebar: {
    height: "90%"
  },
  map: {
    height: "90%"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  marker: {
    width: "50px",
    height: "50px",
    background: "black"
  }
}));

const Element = () => {
  return <Paper elevation={3}>Test</Paper>;
};

class CardList extends React.Component {
  state = {
    data: [0, 1]
  };

  render() {
    return (
      <div>
        {this.state.data.map(element => (
          <Element />
        ))}
      </div>
    );
  }
}

function App() {
  const classes = useStyles();
  return (
    <Grid container className={classes.main}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid className="sidebar" item xs={12} sm={3}>
        <CardList />
      </Grid>
      <Grid className={classes.map} item xs={12} sm={9}>
        <GoogleMaps />
      </Grid>
    </Grid>
  );
}

export default App;
