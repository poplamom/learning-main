import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ToobarAdmin from "./ToobarAdmin";
import Button from "@material-ui/core/Button";
import Userlist from "./Userlist";
import axios from "axios";
export default function UserSetting() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    titlepage: {
      padding: theme.spacing(2, 2),
      color: "#fff",
      background: "#000",
    },
  }));
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [isDelUser, setDelUser] = useState(false);
  console.log(token);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        setUsers(data.users.items);
      } catch (error) {
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      }
    };
    getUsers();
  }, [isDelUser]);

  const listuser = users.map((item) => (
    <Userlist
      key={item.id}
      {...item}
      isDelUser={isDelUser}
      setDelUser={setDelUser}
    ></Userlist>
  ));

  return (
    <div className={classes.root}>
      <ToobarAdmin></ToobarAdmin>
      <div className={classes.titlepage}>
        <Typography variant="h4">Setting User</Typography>
        <Typography variant="h6">update user account</Typography>
      </div>
      <Grid container>
        <Grid container item xl={12}>
          {listuser}
        </Grid>
      </Grid>
    </div>
  );
}
