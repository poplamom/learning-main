import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Grid, Button } from '@material-ui/core'
import ToobarAdmin from './ToobarAdmin'
import TaskDetail from './TaskDetail'
import TaskList from './TaskList'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
export default function TaskSetting() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: '2em',
    },
    titlepage: {
      padding: theme.spacing(2, 2),
      color: '#fff',
      background: '#000',
    },
    updateRoom: { padding: '2em 0' },
    leftBar: {},
    rightBar: {},
    rootTask: {
      margin: '1em 0',
    },
    headTask: {
      width: '100%',
    },
    contentTask: {
      border: '1px solid #2f2f2f',
      padding: '2em',
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
    linkSetting: {
      textDecoration: 'none',
    },
  }))
  const classes = useStyles()
  const location = useLocation()
  const token = localStorage.getItem('accessToken')
  const { id } = location.state
  const [tasks, setTasks] = useState([])

  // const [name, setName] = useState('')
  // const [desc, setDesc] = useState('')
  const [isDelete, setDelete] = useState(false)

  useEffect(() => {
    const getTask = async () => {
      const { data } = await axios.get(`/api/v1/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setTasks(data.course.tasks)
      console.log(JSON.stringify(data.course.tasks))
    }

    getTask()
  }, [isDelete])
  const taskList = (tasks || []).map((item, i) => (
    <TaskList
      key={i}
      {...item}
      no={i + 1}
      isDelete={isDelete}
      setDelete={setDelete}
    ></TaskList>
  ))

  const [fields, setFields] = useState([])

  // function handleChange(i, event) {
  //   const values = [...fields]
  //   values[i].value = event.target.value
  //   setFields(values)
  // }

  function handleAdd() {
    const values = [...fields]
    values.push({ value: null })
    setFields(values)
    console.log(values)
  }

  // function handleRemove(i) {
  //   const values = [...fields]
  //   values.splice(i, 1)
  //   setFields(values)
  // }

  const AddTask = fields.map((idx) => {
    if (fields.length > 0) return <TaskDetail></TaskDetail>
    return <div></div>
  })

  return (
    <div className={classes.root}>
      <ToobarAdmin></ToobarAdmin>

      <div className={classes.titlepage}>
        <Typography variant="h4">Update Room</Typography>
        <Typography variant="h6">Update Room and Setting</Typography>
      </div>
      <Grid container className={classes.updateRoom}>
        <Grid container item xl={2}>
          <Grid container>
            <Grid container item xl={12}>
              <List dense>
                <ListItem button>
                  <ArrowRightIcon></ArrowRightIcon>
                  <Link
                    color="inherit"
                    to={{ pathname: `/updateroom/${id}`, state: { id } }}
                    className={classes.linkSetting}
                  >
                    <Typography variant="subtitle1">Course Setting</Typography>
                  </Link>
                </ListItem>
                <ListItem button>
                  <ArrowRightIcon></ArrowRightIcon>
                  <Link
                    color="inherit"
                    to={{ pathname: `/tasksetting/${id}`, state: { id } }}
                    className={classes.linkSetting}
                  >
                    <Typography variant="subtitle1"> Task Setting</Typography>
                  </Link>
                </ListItem>
                <ListItem button>
                  <ArrowRightIcon></ArrowRightIcon>
                  <Link
                    color="inherit"
                    to={{ pathname: `/staticcourse/${id}`, state: { id } }}
                    className={classes.linkSetting}
                  >
                    <Typography variant="subtitle1"> Static</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xl={10}>
          <Grid container item>
            <Grid item xl={6}>
              <Typography variant="h5" color="initial">
                Task setting
              </Typography>
            </Grid>
            <Grid item xl={6} className={classes.addbtn}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAdd()}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>

          <Grid container item>
            {taskList}
            {AddTask}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
