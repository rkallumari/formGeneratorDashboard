import React, { useEffect } from "react";
import "./styles/App.scss";
import { CssBaseline } from "@material-ui/core";
import { Notification } from "./components/index";
import { QuestionProvider } from "./contexts/questionsContext.js";
import { AppRoutes } from "./routes/routes.js";
import { withRouter } from "react-router-dom";

const App = props => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);

  return (
    <QuestionProvider>
      <CssBaseline>
        <AppRoutes {...props} />
      </CssBaseline>
      <Notification />
    </QuestionProvider>
  );
};

export default withRouter(App);
