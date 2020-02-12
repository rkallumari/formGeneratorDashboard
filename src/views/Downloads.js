import React, { useState } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import API from "../helpers/API";
import LinearProgress from "@material-ui/core/LinearProgress";
var fileDownload = require("js-file-download");

const useStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    minHeight: "30vh"
  },
  root: {
    flexGrow: 1,
    width: "100%"
  },
  body: {
    height: "80vh"
  },
  content: {
    height: "40vh"
  },
  heading: {
    textAlign: "center"
  }
}));

export const Downloads = () => {
  const [loading, setLoading] = useState(false);
  const downloadTemplate = () => {
    setLoading(true);
    API.makeAGetCall(
      "/downloadTemplate",
      function(response) {
        setLoading(false);
        fileDownload(response, "template.docx");
      },
      { responseType: "blob" }
    );
  };
  const downloadQuestions = () => {
    setLoading(true);
    API.makeAGetCall(
      "/downloadQuestion",
      function(response) {
        setLoading(false);
        fileDownload(response, "Questions.json");
      },
      { responseType: "blob" }
    );
  };
  const classes = useStyles();
  let content = (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.body}
      >
        <Grid
          item
          xs={10}
          sm={8}
          md={8}
          lg={8}
          xl={6}
          className={classes.content}
        >
          <Paper className={classes.paper} justify="space-between">
            <Typography variant="h6">
              You can download the current template and questions file here.
              Click on below links
            </Typography>
            {loading ? <LinearProgress /> : null}
            <Grid
              container
              justify="space-between"
              direction="column"
              alignItems="flex-start"
            >
              <Button
                justify="flex-start"
                disabled={loading}
                item
                onClick={downloadTemplate}
                color="primary"
                variant="contained"
                className={classes.buttons}
              >
                Click to download Template docx file
              </Button>
              <Button
                justify="flex-start"
                disabled={loading}
                item
                onClick={downloadQuestions}
                color="primary"
                variant="contained"
                className={classes.buttons}
              >
                Click to download Questions JSON file
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  return content;
};
