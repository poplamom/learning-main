import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, TextField } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import QandA from "./QandA";
import axios from "axios";
import ListQuestion from "./ListQuestion";
import { useLocation } from "react-router-dom";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import swal from "sweetalert";

export default function TaskList({
  id,
  name,
  desc,
  objective,
  status,
  no,
  isDelete,
  setDelete,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    txtFilds: {
      margin: theme.spacing(1),
      width: "70em",
    },
    txtFildQandA: {
      paddingRight: "3em",
      width: "20em",
    },
    groupQandA: {
      padding: "2em 0",
    },
    titlepage: {
      padding: theme.spacing(2, 2),
      color: "#fff",
      background: "#000",
    },
    updateRoom: {
      padding: "2em 0",
    },
    leftBar: {},
    rightBar: {},
    rootTask: {
      margin: "1rem 0",
    },
    headTask: {
      width: "100%",
    },
    contentTask: {
      border: "1px solid #2f2f2f",
      padding: "2rem",
    },
    btnMachine: {
      justifyContent: "center",
      alignItems: "center",
    },
    question: {
      borderBottom: "1px solid #121212",
      paddingBottom: "2em",
      marginBottom: "2em",
    },
    addbtn: {
      textAlign: "right",
    },
    btnTask: {
      marginRight: "0.5em",
    },
  }));
  const classes = useStyles();

  const token = localStorage.getItem("accessToken");

  const [names, setName] = useState(name);
  const [descs, setDesc] = useState(desc);

  const [idtask, setIdtask] = useState();
  const [idcourse, setIdcourse] = useState();

  const [objectives, setObjective] = useState(objective);
  const [statusTask, setStatusTask] = useState(status);

  // const [courseId, setCourseId] = useState(id);
  const [quests, setQuest] = useState([]);

  const [Qfield, setFields] = useState([]);
  const [datas, setData] = useState([]);
  const [disabledTask, setDisabledTask] = useState(true);
  const [isDelQuest, setDelQuest] = useState(false);
  const [disabledQuest, setDisabledQuest] = useState(true);

  const [isAddQ, setAddQ] = useState(false);
  console.log("id course" + idcourse);

  useEffect(() => {
    setIdtask(id);
    // Get question each task by id task
    const getQuestion = async () => {
      setQuest([]);
      console.log("id task =" + id);
      const { data } = await axios.get(`/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuest(data.task.question);
      setIdcourse(data.task.course.id);
    };

    getQuestion();
  }, [isDelete, isAddQ, isDelQuest, disabledQuest]);
  // list question

  console.log(JSON.stringify(quests));

  // Update Task
  const updateTask = async (e) => {
    e.preventDefault();

    // setCourseId(id);

    const bodyParameters = { names, descs, objectives };

    await axios
      .patch(
        `/api/v1/tasks/${id}`,
        { name: names, desc: descs, objective: objectives },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setData(response.data.task);
        // console.log(response);
        // console.log(response.data);
        swal("Success", "Update Success", "success", {
          buttons: false,
          timer: 1000,
        }).then((value) => {
          console.log("UPDATE");
          window.location.reload();
        });
      })
      .catch((error) => {
        swal("Failed", "Error", "error");
        console.log(error.response.status); // 401
        console.log(error.response.data.error);
      });
  };

  function handleChange(i, event) {
    const values = [...Qfield];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...Qfield];
    values.push({ value: null });
    setFields(values);
    console.log(values);
  }

  function handleRemove(i) {
    const values = [...Qfield];
    values.splice(i, 1);
    setFields(values);
  }

  const AddQuestion = Qfield.map((id) => {
    if (Qfield.length > 0)
      return (
        <QandA
          idcourse={idcourse}
          idtask={idtask}
          isAddQ={isAddQ}
          setAddQ={setAddQ}
        ></QandA>
      );
    return <div></div>;
  });
  const listQuest = (quests || []).map((item, i) => {
    return (
      <ListQuestion
        key={i}
        {...item}
        isDelQuest={isDelQuest}
        setDelQuest={setDelQuest}
        setDisabledQuest={setDisabledQuest}
        disabledQuest={disabledQuest}
      />
    );
  });

  //Delete Task
  const fnDelete = async () => {
    try {
      const { data } = await axios.delete(`api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDelete(!isDelete);
      console.log(isDelete);
    } catch (error) {
      console.log(error.response.status); // 401
      console.log(error.response.data.error);
    }
  };

  const confirmDelete = () => {
    swal({
      title: "Are you sure delete?",
      text: "You will delete this Task",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        fnDelete();
        console.log(" Yes");
      } else {
        console.log(" No");
      }
    });
  };
  const editTask = () => {
    setDisabledTask(false);
  };
  const cancleEditTask = () => {
    setDisabledTask(true);
  };
  const BtnUpdatTask = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onSubmit={updateTask}
          className={classes.btnTask}
        >
          Update Task
        </Button>
        <Button
          variant="contained"
          onClick={cancleEditTask}
          className={classes.btnTask}
        >
          Cancle
        </Button>
      </>
    );
  };
  const BtnEditTask = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.btnTask}
        onClick={editTask}
      >
        Edit Task
      </Button>
    );
  };
  return (
    <Grid container className={classes.rootTask} xl={12}>
      <Accordion className={classes.headTask}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography variant="h5">
            <RadioButtonCheckedIcon></RadioButtonCheckedIcon> {name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={classes.contentTask}>
            <Grid item container xl={12} className={classes.question}>
              <Grid item xl={12}>
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={updateTask}
                >
                  <div>
                    <TextField
                      className={classes.txtFilds}
                      id="title"
                      label="Title"
                      variant="outlined"
                      value={names}
                      disabled={disabledTask}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      className={classes.txtFilds}
                      id="description"
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={descs}
                      disabled={disabledTask}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      className={classes.txtFilds}
                      id="objective"
                      label="objective"
                      variant="outlined"
                      value={objectives}
                      disabled={disabledTask}
                      onChange={(e) => setObjective(e.target.value)}
                    />
                  </div>
                  <div>
                    {disabledTask ? <BtnEditTask /> : <BtnUpdatTask />}
                    <Button
                      className={classes.btnTask}
                      variant="contained"
                      color="secondary"
                      onClick={confirmDelete}
                    >
                      Delete Task
                    </Button>
                  </div>
                </form>
                <Grid container>
                  <Grid container className={classes.groupQandA}>
                    <Grid item xl={6}>
                      <Typography variant="h6" color="initial">
                        Questions and Answers
                      </Typography>
                    </Grid>
                    <Grid item xl={6} className={classes.addbtn}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                      >
                        Add Questions
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xl={12}>
                    {AddQuestion}
                    {listQuest}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
