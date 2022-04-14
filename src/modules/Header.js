import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: 1,
  },
  btnheader: {
    backgroundColor: "#66FCF1",

    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#66FCf6",
    },
  },
  toolbars: {
    backgroundColor: "#141414",
    color: "#fff",
    padding: theme.spacing(0, 2),
  },
  linkA: {
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  if (!token) {
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbars}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <a href="/" className={classes.linkA}>
              {title}{" "}
            </a>
          </Typography>

          <Button
            size="medium"
            variant="outlined"
            className={classes.btnheader}
            href="/signup"
          >
            Sign up
          </Button>
          <Button
            size="medium"
            variant="outlined"
            className={classes.btnheader}
            href="/signin"
          >
            Sign In
          </Button>
        </Toolbar>
      </React.Fragment>
    );
  }

  if (user.role === "Admin") {
    return (
      <>
        <Toolbar className={classes.toolbars}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <a href="/" className={classes.linkA}>
              {title}
            </a>
          </Typography>

          <Button
            size="medium"
            variant="outlined"
            className={classes.btnheader}
            href="/adminprofile"
          >
            Admin Profile
          </Button>
          <Button
            size="medium"
            variant="outlined"
            className={classes.btnheader}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Toolbar>
      </>
    );
  } else {
    return (
      <>
        <Toolbar className={classes.toolbars}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <a href="/" className={classes.linkA}>
              {title}
            </a>
          </Typography>

          <Button
            size="medium"
            variant="outlined"
            className={classes.btnheader}
            href="/userprofile"
          >
            User Profile
          </Button>
          <Button
            size="medium"
            variant="outlined"
            className={classes.btnheader}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Toolbar>
      </>
    );
  }
}
