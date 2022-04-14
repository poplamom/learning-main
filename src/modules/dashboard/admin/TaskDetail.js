import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Grid, Button, TextField } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import QandA from './QandA'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
export default function TaskDetail() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    txtFilds: {
      margin: theme.spacing(1),
      width: '70em',
    },
    txtFildQandA: {
      paddingRight: '3em',
      width: '20em',
    },
    groupQandA: {
      padding: '2em 0',
    },
    titlepage: {
      padding: theme.spacing(2, 2),
      color: '#fff',
      background: '#000',
    },
    updateRoom: {
      padding: '2em 0',
    },
    leftBar: {},
    rightBar: {},
    rootTask: {
      margin: '1rem 0',
    },
    headTask: {
      width: '100%',
    },
    contentTask: {
      border: '1px solid #2f2f2f',
      padding: '2rem',
    },
    btnMachine: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    question: {
      borderBottom: '1px solid #121212',
      paddingBottom: '2em',
      marginBottom: '2em',
    },
    addbtn: {
      textAlign: 'right',
    },
  }))
  const classes = useStyles()

  const token = localStorage.getItem('accessToken')
  // const [tasks, setTasks] = useState([])
  const location = useLocation()

  const { id } = location.state

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [objective, setObjective] = useState('')
  const [courseId, setCourseId] = useState(id)

  const [Qfields, setFields] = useState([])
  const [data, setData] = useState()
  console.log(id)
  const createTask = async (e) => {
    e.preventDefault()
    console.log(token)
    console.log(id)

    setCourseId(id)

    const bodyParameters = { name, desc, objective, courseId }
    console.log(bodyParameters)
    await axios
      .post('/api/v1/tasks', bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data.task)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }

  // function handleChange(i, event) {
  //   const values = [...Qfields]
  //   values[i].value = event.target.value
  //   setFields(values)
  // }

  function handleAdd() {
    const values = [...Qfields]
    values.push({ value: null })
    setFields(values)
    console.log(values)
  }

  // function handleRemove(i) {
  //   const values = [...Qfields]
  //   values.splice(i, 1)
  //   setFields(values)
  // }

  // const ListQuestion = Qfields.map((id) => {
  //   if (Qfields.length > 0) return <QandA></QandA>
  //   return <div></div>
  // })
  return (
    <Grid container className={classes.rootTask} xl={12}>
      <Accordion className={classes.headTask}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography variant="h5">New Task</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={classes.contentTask}>
            <Grid item container xl={12} className={classes.question}>
              <Grid item xl={12}>
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={createTask}
                >
                  <div>
                    <TextField
                      className={classes.txtFilds}
                      id="title"
                      label="Title"
                      variant="outlined"
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
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      className={classes.txtFilds}
                      id="objective"
                      label="objective"
                      variant="outlined"
                      onChange={(e) => setObjective(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onSubmit={createTask}
                    >
                      Save Task
                    </Button>
                  </div>
                </form>
                <Grid container>
                  <Grid container className={classes.groupQandA}>
                    <Grid item xl={6}>
                      <Typography variant="subtitle1" color="initial">
                        Questions, Answers and Hints
                      </Typography>
                    </Grid>
                    <Grid item xl={6} className={classes.addbtn}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd()}
                      >
                        Add Questions
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xl={12}>
                    {/* <QandA></QandA>
                      {ListQuestion} */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}
