import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useLocation } from "react-router-dom";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  itemModule: {
    minWidth:280,
    textAlign: "center",
    display: "inline-block",
    border: " 1px solid #555",
    padding: "5px",
    height: 300,
    margin: "1em",
    
    
  },
  media: {
    height: 130,
  },
  linkcolor:{
    color:"#000",
  }
}));
export default function ModuleItem({
  id,
  name,
  desc,
  btn,
  updateEnroll,
  setupdateEnroll,
}) {
  const classes = useStyles();
  // const { titleModule, descModule, imageModule } = dataitem;

  const token = localStorage.getItem("accessToken");
  const users = localStorage.getItem("user");
  const location = useLocation();

  const [courseId, setCourseId] = useState(id);
  const [data, setData] = useState();
  const [datauser, setDatauser] = useState("");
  const [user, setUser] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);

    return initialValue || "";
  });

  const userId = user.id;

  const bodyParameters = { userId, courseId };

  // console.log(bodyParameters);

  const createEnroll = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/v1/progresses", bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setupdateEnroll(!updateEnroll);

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      });
  };

  return (
    <Grid className={classes.itemModule}>
      {!btn ? ( 
    <div>
        <img className={classes.media} />
        {/* {imageModule} */}
        <Typography variant="h5">{name} </Typography>

        <Typography>{desc}</Typography>
        <Typography>{btn}</Typography>
        </div>
       ) : ( <Link className={classes.linkcolor}
       
        to={{ pathname: `LeaningDetail/${id}`, state: { id } }}
      >
        <img className={classes.media} />
        {/* {imageModule} */}
        <Typography variant="h5">{name} </Typography>

        <Typography>{desc}</Typography>
        <Typography>{btn}</Typography>
      </Link> )}

      {!btn ? (
        <Button variant="contained" color="primary" onClick={createEnroll}>
          Enroll
        </Button>
      ) : (
        <></>
      )}
    </Grid>
  );
}
