import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  Button,
  InputAdornment,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { notify } from "../components";
import API from "../helpers/API";
import { withStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
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
  },
  title: {
    fontWeight: "bold",
    marginRight: theme.spacing(1)
  },
  panel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  panelItem: {
    marginTop: theme.spacing(2),
    width: "50%"
  },
  accordion: {
    backgroundColor: "grey"
  },
  table: {
    width: "100%"
  },
  card: {
    width: "100%"
  }
}));

export const Questions = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [question, setQuestion] = useState("");
  const [key, setKey] = useState("");
  const [currentKey, setCurrentKey] = useState("");
  const [editClicked, setEditClicked] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updated, setUpdated] = useState(false);
  const [description] = useState(
    "This is the unique key which you can use as placeholder in the template!"
  );
  const [questionDescription] = useState(
    "This is the question seen by the end user in the application!"
  );
  const classes = useStyles();

  useEffect(() => {
    API.makeAGetCall("/getAllQuestions", function(response) {
      console.log(response);
      setQuestionsList(response);
    });
  }, []);

  useEffect(() => {
    if (updated)
      API.makeAGetCall("/getAllQuestions", function(response) {
        console.log(response);
        setQuestionsList(response);
      });
    setUpdated(false);
  }, [updated]);

  const ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1
    }
  })(MuiExpansionPanelSummary);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleExpansion(id) {
    setEditClicked(false);
    if (expanded === id + "_expand") {
      setExpanded("");
      setQuestion("");
      setKey("");
      setCurrentKey("");
    } else {
      setExpanded(id + "_expand");
      var quesSelected = questionsList.filter(ques => ques.key === id);
      setQuestion(quesSelected[0].question);
      setKey(quesSelected[0].key);
      setCurrentKey(quesSelected[0].key);
    }
  }

  function update() {
    if (question.length < 0 || question === "" || key.length < 0 || key === "")
      notify("Please fill in the Question and the key");
    else {
      var payLoadData = {};
      payLoadData["key"] = key;
      payLoadData["currentKey"] = currentKey;
      payLoadData["question"] = question;
      API.makeAPutCall("/updateQuestion", payLoadData, function(response) {
        setEditClicked(false);
        notify(response.result);
        setUpdated(true);
      });
    }
  }

  function deleteQuestion(key) {
    API.makeADeleteCall("/deleteQuestion", { key: [key] }, function() {
      notify("Deleted Successfully!");
      setUpdated(true);
    });
  }

  function handleEditClicked() {
    setEditClicked(true);
  }

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
              Questions created so far. You can edit and delete any of them
              here!
            </Typography>
            <Table>
              <TableBody>
                {questionsList && questionsList.length ? (
                  questionsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableRow key={index}>
                        <ExpansionPanel
                          className={classes.panel}
                          expanded={expanded === item.key + "_expand"}
                          onChange={e => handleExpansion(item.key)}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={item.key + "_panel-header"}
                            id={item.key + "_panel-header"}
                            className={classes.accordion}
                          >
                            <Typography>{item.key}</Typography>
                          </ExpansionPanelSummary>

                          <ExpansionPanelDetails>
                            {editClicked ? (
                              <Grid
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                                className={classes.table}
                              >
                                <Grid item className={classes.panelItem}>
                                  <FormControl className={classes.table}>
                                    <InputLabel htmlFor="key" required={true}>
                                      Key
                                    </InputLabel>
                                    <Input
                                      value={key}
                                      id="key"
                                      required={true}
                                      onChange={e => setKey(e.target.value)}
                                      endAdornment={
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
                                      }
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item className={classes.panelItem}>
                                  <FormControl className={classes.table}>
                                    <InputLabel
                                      htmlFor="question"
                                      required={true}
                                    >
                                      Question
                                    </InputLabel>
                                    <Input
                                      value={question}
                                      id="Question"
                                      required={true}
                                      onChange={e =>
                                        setQuestion(e.target.value)
                                      }
                                      endAdornment={
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
                                      }
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid className={classes.card}>
                                <Grid>
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    className={classes.title}
                                  >
                                    Key
                                  </Typography>
                                  <Typography component="span" variant="body1">
                                    {item.key}
                                  </Typography>
                                </Grid>
                                <Grid>
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    className={classes.title}
                                  >
                                    Question
                                  </Typography>
                                  <Typography component="span" variant="body1">
                                    {item.question}
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          </ExpansionPanelDetails>
                          <Divider variant="inset" />
                          <ExpansionPanelActions>
                            {!editClicked ? (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<EditIcon />}
                                onClick={handleEditClicked}
                              >
                                Edit
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={e => update(item.key)}
                              >
                                Save
                              </Button>
                            )}
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<DeleteIcon />}
                              size="small"
                              onClick={e => deleteQuestion(item.key)}
                            >
                              Delete
                            </Button>
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                      </TableRow>
                    ))
                ) : (
                  <Typography variant="body2" justify="center">
                    No content to show
                  </Typography>
                )}
              </TableBody>
            </Table>
            {questionsList && questionsList.length ? (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={questionsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  return content;
};
