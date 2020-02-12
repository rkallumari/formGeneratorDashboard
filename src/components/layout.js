import React from "react";
import {
  makeStyles,
  useMediaQuery,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import { Header } from "./header";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  header: {
    display: "flex",
    flex: "0 0 auto"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  mobileContent: {
    "-webkit-overflow-scrolling": "touch",
    flexGrow: 1,
    height: "100%",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  iOSPadding: {
    height: iOS ? theme.spacing(2) : 0
  }
}));

export const Layout = props => {
  const classes = useStyles();

  let applicationTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#039be5"
      },
      secondary: {
        main: "#c62828"
      },
      type: "light"
    }
  });
  let isItDesktop = useMediaQuery("(min-width:600px) and (min-height:600px)");
  let content = (
    <MuiThemeProvider theme={applicationTheme}>
      <div className={classes.root}>
        <Header />
        <main className={isItDesktop ? classes.content : classes.mobileContent}>
          <div className={classes.appBarSpacer} />
          {props.children}
          <div className={classes.appBarSpacer} />
          <div className={classes.iOSPadding} />
        </main>
      </div>
    </MuiThemeProvider>
  );
  return content;
};
