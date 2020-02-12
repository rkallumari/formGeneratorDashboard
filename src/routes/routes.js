import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Questions, AddQuestions, Upload, Downloads } from "../views";
import { Layout } from "../components";

export const AppRoutes = props => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <Home {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/questions"
        render={() => (
          <Layout>
            <Questions {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/addquestion"
        render={() => (
          <Layout>
            <AddQuestions {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/uploads"
        render={() => (
          <Layout>
            <Upload {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/downloads"
        render={() => (
          <Layout>
            <Downloads {...props} />
          </Layout>
        )}
      />
    </Switch>
  );
};
