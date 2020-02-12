import React, { useState } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { notify } from "../components";
import API from "../helpers/API";

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
  },
  margin: {
    margin: theme.spacing(2)
  }
}));

export const Upload = () => {
  const classes = useStyles();
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);

  const openTemplateUpload = () => {
    setOpenTemplate(true);
    setOpenQuestion(false);
  };

  const openQuestionUpload = () => {
    setOpenTemplate(false);
    setOpenQuestion(true);
  };

  const handleClose = () => {
    setOpenTemplate(false);
    setOpenQuestion(false);
  };

  const handleSave = files => {
    if (openTemplate) {
      API.uploadFile("/uploadTemplate", files[0], function(response) {
        notify(response.result);
        setOpenTemplate(false);
      });
    } else if (openQuestion) {
      API.uploadFile("/uploadQuestion", files[0], function(response) {
        notify(response.result);
        setOpenQuestion(false);
      });
    }
  };

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
              Template and Questions file Upload
            </Typography>
            <Grid className={classes.margin}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Typography item={true} variant="body1">
                  You can upload the template in docx format here. Please note
                  that this will override the current template.
                </Typography>
                <Button
                  item={true}
                  onClick={openTemplateUpload}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {" "}
                  Click here to upload template
                </Button>
                <DropzoneDialog
                  open={openTemplate}
                  onSave={handleSave}
                  acceptedFiles={[
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleClose}
                  dialogTitle="Template Upload"
                  dropzoneText="Drag and drop / manually select the template docx file here"
                  filesLimit={1}
                />
              </Grid>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                wrap="wrap"
              >
                <Typography item={true} variant="body1">
                  You can upload the questions in JSON format here. Please note
                  that this will override all the questions present. Format to
                  be followed is{" "}
                  {"{Questions : [{key:YOUR_KEY,question:YOUR_QUESTION}]"}
                </Typography>
                <Button
                  item={true}
                  onClick={openQuestionUpload}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {" "}
                  Click here to upload Questions
                </Button>
                <DropzoneDialog
                  open={openQuestion}
                  onSave={handleSave}
                  acceptedFiles={["application/json"]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleClose}
                  dialogTitle="Questions Upload"
                  dropzoneText="Drag and drop / manually select the questions JSON file here"
                  filesLimit={1}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  return content;
};
