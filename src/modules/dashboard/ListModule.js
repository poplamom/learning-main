import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { green } from "@material-ui/core/colors";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  imageItem: {
    padding: theme.spacing(2),
  },
}));
export default function ListModule({ topic, title, desc }) {
  const classes = useStyles();

  return (
    <Link color="inherit" href="/LeaningDetail">
      <List dense className={classes.root}>
        <ListItem key={title} button>
          <CheckCircleOutlineIcon style={{ color: green[500] }} />
          <ListItemAvatar className={classes.imageItem}>
            <Avatar src={`/static/images/avatar/${topic + 1}.jpg`} />
          </ListItemAvatar>
          <ListItemText primary={title} secondary={desc} />
          {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
        </ListItem>
      </List>
    </Link>
  );
}
