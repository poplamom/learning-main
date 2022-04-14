import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ToobarAdmin from "./ToobarAdmin";
import { useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import swal from "sweetalert";
import UserModule from "./UserModule";
export default function UpdateUser() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    btnUser: {
      margin: theme.spacing(1),
    },
    titlepage: {
      padding: theme.spacing(2, 2),
      color: "#fff",
      background: "#000",
    },
    txtFildUser: {
      padding: "1em 0",
    },
    inputText: {
      width: "400px",
    },
    allGroup: {
      padding: "1em 0",
      textAlign: "center",
      justifyContent: "center",
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      justifyItems: "center",
      display: "inline-flex",
      textAlign: "center",
      marginBottom: "1em",
    },
    radioBox: {
      display: "inline",
    },
    input: {
      display: "none",
    },
    dashboard: {
      padding: theme.spacing(3, 2),
    },
  }));
  const classes = useStyles();
  const location = useLocation();
  const { id } = location.state;

  const [users, setUsers] = useState("");
  const token = localStorage.getItem("accessToken");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState("");
  const [disabledUser, setDisabledUser] = useState(true);
  const [progress, setProgress] = useState([]);
  const coursee = [];

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const getCourse = async () => {
    const { data } = await axios.get(`/api/v1/progresses/mycourse/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProgress(data.progresses);
    // setCourse(data.progresses.courseId);
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`/api/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(data);

        setUsers(data.user);

        console.log(users);
        setAvatar(data.user.avatar);
        setEmail(data.user.email);
        setName(data.user.name);
        setRole(data.user.role);
      } catch (error) {
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      }
    };
    getUsers();
    getCourse();
  }, [disabledUser]);
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

  const courselist = (coursee || []).map((item, i) => {
    return <UserModule userid={id} key={i} {...item} />;
  });
  const updateUsers = async (e) => {
    e.preventDefault();
    console.log(role);
    await axios
      .patch(
        `/api/v1/users/${id}`,
        { email, Password: password, name, role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUsers(response.data.user);
        setDisabledUser(true);

        swal("Success", "Update Success", "success", {
          buttons: false,
          timer: 1000,
        }).then((value) => {
          console.log("UPDATE");
        });
      })
      .catch((error) => {
        swal("Failed", "Error", "error");
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      });
  };

  const editUser = () => {
    setDisabledUser(false);
  };
  const cancleEditUser = () => {
    setDisabledUser(true);
  };
  const BtnUpdatUser = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onSubmit={updateUsers}
        >
          Update User
        </Button>
        <Button variant="contained" onClick={cancleEditUser}>
          Cancle
        </Button>
      </>
    );
  };
  const BtnEditUser = () => {
    return (
      <Button variant="contained" color="primary" onClick={editUser}>
        Edit User
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      <ToobarAdmin></ToobarAdmin>

      <div className={classes.titlepage}>
        <Typography variant="h4">Setting User</Typography>
        <Typography variant="h6">update user account</Typography>
      </div>
      <Grid container className={classes.allGroup}>
        <Grid item xl={12}>
          <form noValidate autoComplete="off" onSubmit={updateUsers}>
            {/* <div>
              <Avatar alt="Remy Sharp" src={avatar} className={classes.large} />
            </div> */}
            <div>
              {/* <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label> */}
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
            </div>
            <div className={classes.txtFildUser}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                disabled={disabledUser}
                className={classes.inputText}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={classes.txtFildUser}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                className={classes.inputText}
                disabled={disabledUser}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.txtFildUser}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                disabled={disabledUser}
                className={classes.inputText}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <FormControl component="fieldset">
                <RadioGroup
                  className={classes.radioBox}
                  aria-label="Role"
                  name="Roles"
                  value={role}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    disabled={disabledUser}
                    value="Member"
                    control={<Radio />}
                    label="Member"
                  />
                  <FormControlLabel
                    disabled={disabledUser}
                    value="Admin"
                    control={<Radio />}
                    label="Admin"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {disabledUser ? <BtnEditUser /> : <BtnUpdatUser />}
            <Link href="/usersetting">
              <Button
                variant="contained"
                color="primary"
                className={classes.btnUser}
              >
                Back
              </Button>
            </Link>
          </form>
        </Grid>
      </Grid>

      <Grid container className={classes.dashboard}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
          User-learned course
            {courselist}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
