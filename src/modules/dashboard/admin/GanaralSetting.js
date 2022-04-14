import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  TextField,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
export default function GanaralSetting({ id, name, desc, tasks }) {
  const useStyles = makeStyles((theme) => ({
    titlepage: {
      padding: theme.spacing(3, 2),
      color: "#fff",
      background: "#000",
    },
    input: {
      display: "none",
    },
    formCrate: {
      justifyContent: "center",
      "& div": {
        padding: theme.spacing(1),
      },
    },
    btnSetting: {
      textAlign: "center",
    },
    textField: {
      width: "30em",
      padding: "2em 0",
    },
  }));
  const classes = useStyles();
  const token = localStorage.getItem("accessToken");

  const [datas, setData] = useState();
  const [names, setName] = useState(name);
  const [descs, setDesc] = useState(desc);
  const [ids, setId] = useState(id);
  const [disabledCourse, setDisabledCourse] = useState(true);

  console.log(id);
  useEffect(() => {
    const getCoure = async () => {
      const { data } = await axios.get(`/api/v1/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(data.course);
      setName(data.course.name);
      setDesc(data.course.desc);
      setId(id);
      console.log(data.course);
    };

    getCoure();
  }, []);

  const Update = async (e) => {
    e.preventDefault();
    console.log(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = { names, descs };
    console.log(bodyParameters);
    await axios
      .patch(
        `/api/v1/courses/${id}`,
        { name: names, desc: descs },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setData(response.data);
        console.log(datas);
        swal("Success", "Update Success", "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          console.log("UPDATE");
          window.location.reload();

          // localStorage.setItem("user", JSON.stringify(response["user"]));
          // window.location.href = "/adminprofile";
        });
      })
      .catch((error) => {
        swal("Failed", "Error", "error");

        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      });
  };
  const editCourse = () => {
    setDisabledCourse(false);
  };
  const cancleEditCourse = () => {
    setDisabledCourse(true);
  };
  const BtnUpdatCourse = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onSubmit={Update}
        >
          Update Course
        </Button>
        <Button variant="contained" onClick={cancleEditCourse}>
          Cancle
        </Button>
      </>
    );
  };
  const BtnEditCourse = () => {
    return (
      <Button variant="contained" color="primary" onClick={editCourse}>
        Edit Course
      </Button>
    );
  };
  return (
    <div className={classes.formCrate}>
      <form noValidate autoComplete="off" onSubmit={Update}>
        <div>
          <InputLabel htmlFor="Title">Title</InputLabel>
          <TextField
            variant="outlined"
            id="title"
            value={names}
            disabled={disabledCourse}
            onChange={(e) => setName(e.target.value)}
            className={classes.textField}
          />
        </div>
        <div>
          <InputLabel htmlFor="description">Description</InputLabel>
          <TextField
            id="description"
            variant="outlined"
            value={descs}
            onChange={(e) => setDesc(e.target.value)}
            disabled={disabledCourse}
            className={classes.textField}
          />
        </div>

        <div>
       
        </div>
        <div className={classes.btnSetting}>
          {disabledCourse ? <BtnEditCourse /> : <BtnUpdatCourse />}
        </div>
      </form>
    </div>
  );
}
