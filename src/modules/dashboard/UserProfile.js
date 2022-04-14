import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Links from "@material-ui/core/Link";
import Header from "../Header";
import Mymodule from "./MyModule";
import NewMudule from "./NewModule";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarSecondary: {
    background: "#000",
    color: "#fff",
    padding: theme.spacing(3, 2),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  toolbar: { borderBottom: `1px solid ${theme.palette.divider}` },
  dashboard: {
    padding: theme.spacing(3, 2),
  },
  btnSetting: {
    textAlign: "center",
  },
}));

export default function UserPofile() {
  const token = localStorage.getItem("accessToken");

  const classes = useStyles();
  const [user, setUser] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);

    return initialValue || "";
  });
  const userId = user.id;
  const [progress, setProgress] = useState([]);

  const [mycourse, setCourse] = useState([]);
  const coursee = [];
  var questionCount = [];
  const [data, setData] = useState([]);
var bodyParameters;
  const getCourse = async () => {
    const { data } = await axios.get(`/api/v1/progresses/mycourse/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProgress(data.progresses);
    // setCourse(data.progresses.courseId);
  };
  // console.log(progress);
  // program to loop through an object using for...in loop

  // console.log("ID COURSE = "+mycourse);

  // const CountQuestion = async () => {

  //   await axios
  //     .post("/api/v1/progressesdetail/couters", bodyParameters, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       // setData(response.data);
  //       console.log(
  //         "couter response =" + JSON.stringify(response.data.counter.length)
  //       );

  //     })
  //     .catch((error) => {
  //       console.log(error.response.status); // 401
  //       console.log(error.response.data.error);
  //     });
  // };

  // using for...in

  for (let key in progress) {
    let i = 0;
    let value;

    // get the value
    value = progress[key];
    coursee.push(value.course[i]);
    // console.log(value);
    console.log("loop i =" + i);
    
   



    i++;
  }

  // console.log(coursee)
  // console.log(progress)

  useEffect(() => {
    getCourse();
  }, []);
  const courselist = (coursee || []).map((item, i) => {
    return <Mymodule key={i} {...item} />;
  });

  return (
    <div className={classes.root}>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Links
          color="inherit"
          noWrap
          variant="h6"
          className={classes.toolbarLink}
          href="/allmodule"
        >
          All Course
        </Links>
        <Links
          color="inherit"
          noWrap
          variant="h6"
          className={classes.toolbarLink}
          href="/userprofile"
        >
          My Course
        </Links>
        <Links
          color="inherit"
          noWrap
          variant="h6"
          className={classes.toolbarLink}
          href="/settingprofile"
        >
          Setting
        </Links>
      </Toolbar>

      <Grid container className={classes.dashboard}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            My Course
            {courselist}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
