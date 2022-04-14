import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

export default function LeftBar({ id }) {
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const getCourse = async () => {
      const { data } = await axios.get("/api/v1/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(data.courses);
      console.log(data);
    };

    getCourse();
  }, []);
  return (
    <>
      <List dense>
        <ListItem button>
          <Link color="inherit" href="/updateroom">
            <ListItemText primary="Genarate" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link color="inherit" href="/tasksetting ">
            <ListItemText primary="Task" />
          </Link>
        </ListItem>
      </List>
    </>
  );
}
