import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { Image } from "../components/Image";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  return (
    <Grid container justify="flex-start" direction="column" alignItems="center">
      <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
        <Image
          src={
            "https://cdn0.iconfinder.com/data/icons/business-startup-10/50/76-512.png"
          }
        />
      </Grid>
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Typography variant="h5" align="center">
          Welcome to Admin page form and letter generator
        </Typography>
        <Typography variant="body2" align="center">
          <Link to="./questions" component={RouterLink}>
            View Questions
          </Link>
        </Typography>
        <Typography variant="body2" align="center">
          <Link to="./addquestion" component={RouterLink}>
            Add Questions
          </Link>
        </Typography>
        <Typography variant="body2" align="center">
          <Link to="./uploads" component={RouterLink}>
            Upload template/questions
          </Link>
        </Typography>
        <Typography variant="body2" align="center">
          <Link to="./downloads" component={RouterLink}>
            Download template/questions
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};
