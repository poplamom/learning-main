import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 2),

  },
  allList: {
    border: " 1px solid #555",
    borderRadius: "15px",
    margin: theme.spacing(2, 0),
  },
}));

const mainFeaturedPost = {
  title: "Cyber security training",
  description:
    "Making it easier to break into security, all through your browser.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

export default function MyModule({ id, name }) {
  const token = localStorage.getItem("accessToken");
  const [datas, setData] = useState([]);
  const [datas2, setData2] = useState([]);

  const classes = useStyles();
  const [user, setUser] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);

    return initialValue || "";
  });
  const userId = user.id;
  var maxquetsion = 0;
  var valueprocess = 0;
  var calpersent ;
  const courseId = id;
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 40 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgressWithLabel);

  const bodyParameters = { userId, id };


  const countQuestion = async (e) => {
    await axios
      .post("/api/v1/progressesdetail/couters", bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.counter === 0) {
          setData(null);
        } else {
          setData(response.data.counter);
        }
        console.log(response.data);

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      });
  };
  const bodyParameters2 = { courseId };

  const coutAllQuestion = async (e) => {
    await axios
      .post("/api/v1/questions/couters", bodyParameters2, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.counter === 0) {
          setData2(null);
        } else {
          setData2(response.data.counter);
        }
        // console.log(response.data.counter);

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      });
  };
  useEffect(() => {
    countQuestion();
    coutAllQuestion();
  }, []);

  if (datas !== null) {
    console.log(datas.length);
    valueprocess = datas.length;
  } else {
    valueprocess = 0;
  }

  if (datas2 !== null) {
    console.log(datas2.length);
    maxquetsion = datas2.length;
  } else {
    valueprocess = 0;
  }
   calpersent = Math.ceil((valueprocess * 100) / maxquetsion);
  var progressBar;
  if (calpersent >0) {
    progressBar = <BorderLinearProgress value={calpersent} />;

  } else if(calpersent ===0) {
    progressBar = <BorderLinearProgress value={0} />;

  }else{
    progressBar = <BorderLinearProgress value={0} />;

  }
  return (
    <div className={classes.allList}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BookmarkBorderOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <Link
            color="inherit"
            to={{ pathname: `LeaningDetail/${id}`, state: { id } }}
          >
            <ListItemText primary={name} />{" "}
          </Link>
        </ListItem>
      {progressBar}

      </List>
    </div>
  );
}
