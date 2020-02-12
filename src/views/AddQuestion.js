import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  Paper,
  Button,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { notify } from "../components";
import API from "../helpers/API";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import Info from "@material-ui/icons/Info";

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

export const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [key, setKey] = useState("");
  const [description] = useState(
    "This is the unique key which you can use as placeholder in the template!"
  );
  const [questionDescription] = useState(
    "This is the question seen by the end user in the application!"
  );
  const classes = useStyles();
  const validationCheck = () => {
    if (question && question !== "" && key && key !== "") {
      save();
    } else {
      notify("Please fill in the question and the key!");
    }
  };
  function save() {
    var payload = {};
    payload["key"] = key;
    payload["question"] = question;
    API.makeAPostCall("/addQuestion", payload, function(response) {
      setKey("");
      setQuestion("");
      notify(response.result);
    });
  }
  let content = (
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
            Create Questions you want to show to the user
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="key"
              label="Key"
              name="key"
              autoComplete="email"
              value={key}
              onChange={e => setKey(e.target.value)}
              autoFocus={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      title={description}
                      color="inherit"
                      size="small"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="question"
              label="Question"
              name="question"
              autoComplete="email"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      title={questionDescription}
                      color="inherit"
                      size="small"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                item
                justify="center"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={validationCheck}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
  return content;
};
