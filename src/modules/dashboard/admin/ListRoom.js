import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
export default function ListRoom({ id, name, desc, isDeletes, setDeletes }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow:1,
      paddingRight:"0.5em",
     
    },
    allRoom: {
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #c1c1c1",
      borderRadius: "25px",
      margin: "1em 0",
      padding: "1em",
      width: "600px"
    },
    linkClick1:{
      textDecoration:"none",
      color: "#000",
      "&:hover": {
        color: "#000",
        textshadow:" 2px 2px 5px #fff",

    }

    },
  }));
  const classes = useStyles();
  const token = localStorage.getItem("accessToken");




const userDelete = async () => {
  try {
    const { data } = await axios.delete(`api/v1/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("XX"+id);
    setDeletes(id);

  } catch (error) {
    console.log(error.response.status); // 401
    console.log(error.response.data.error);

  }
};
  const confirmDelete = () => {
    swal({
      title: "Are you sure?",
      text: "You will delete this Course",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(function (isConfirm) {
      /*Your Code Here*/
      if (isConfirm) {
        userDelete();

        console.log(" Yes");

      } else {
        console.log(" No");
      }
    });
  };
  return (
    <div className={classes.root}>

    <Grid container  className={classes.allRoom} >
      <Grid item xs={1}>
      
      </Grid>

      <Grid item xs={8}>
        <Link className={classes.linkClick1} 
          color="inherit"
          to={{ pathname: `updateroom/${id}`, state: { id } }}
        >
          <Typography variant="subtitle1" color="initial">
            {name}
          </Typography>
          </Link>
          <Link className={classes.linkClick1} 
          color="inherit"
          to={{ pathname: `updateroom/${id}`, state: { id } }}
        >
          <Typography variant="subtitle1" color="initial">
            {desc}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs>

      <Button
        variant="contained"
        color="secondary"
        onClick={confirmDelete}
        key={id}
      >
        Delete
      </Button>
      </Grid>

    </Grid>
    </div>
  );
}
