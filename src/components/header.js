import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: "center"
  }
}));

export const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const navigateToHome = () => {
    history.push("./");
  };
  return (
    <AppBar position={"fixed"} elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Home"
          onClick={navigateToHome}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Form and Letter Generator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
