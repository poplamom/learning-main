import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Grid, Button, Toolbar } from '@material-ui/core'
// import LinearProgress from '@material-ui/core/LinearProgress'
import Task from './Task'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
export default function LeaningDetail() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    titlepage: {
      padding: theme.spacing(3, 2),
      color: '#fff',
      background: '#000',
    },
    video: {
      maxHeight: '600px',
      display: 'block',
      background: '#000',
      height: '600px',
    },
    progress: {
      colorPrimary: {
        backgroundColor:
          theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      },
      bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
      },
    },
    secAtk: { textAlign: 'right', marginTop: 10 },
    txtHead: {
      padding: '2.5em 0',
      alignItems: 'center',
    },
    btnback: {
      color: '#fff',
    },
  }))
  const classes = useStyles()

  let history = useHistory()

  const location = useLocation()
  const token = localStorage.getItem('accessToken')
  const { id } = location.state
  const [tasks, setTasks] = useState([])
  const [course, setCourse] = useState([])

  // const [name, setName] = useState('')
  // const [desc, setDesc] = useState('')
  const [isDelete] = useState(false)

  useEffect(() => {
    const getTask = async () => {
      const { data } = await axios.get(`/api/v1/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setTasks(data.course.tasks)
      console.log(data.course.tasks)
      setCourse(data.course)
    }

    getTask()
  }, [isDelete])

  const taskList = (tasks || []).map((data, id) => (
    <Task key={id} no={id + 1} {...data} />
  ))

  return (
    <div className={classes.root}>
      <div className={classes.titlepage}>
        <Button className={classes.btnback} onClick={history.goBack}>
          Back to all modules
        </Button>

        <Typography variant="h6"></Typography>
        <Typography variant="h4">{course.name}</Typography>
        <Typography variant="h6">{course.desc}</Typography>
      </div>
      <Grid container>
        <Grid container item spacing={1}>
          <Grid item xl={12} className={classes.secAtk}></Grid>
        </Grid>
        <Grid container item>
          <Grid item xl={12}>
            {taskList}
          </Grid>
        </Grid>
      </Grid>
      <Toolbar></Toolbar>
    </div>
  )
}
