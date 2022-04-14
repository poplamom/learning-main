import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ListModule from './ListModule'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titlepage: {
    padding: theme.spacing(3, 2),
    color: '#fff',
    background: '#000',
  },
}))

export default function ModuleDetail() {
  const classes = useStyles()
  const location = useLocation()
  const token = localStorage.getItem('accessToken')
  const id = location.state
  const [tasks, setTasks] = useState([])

  // const [name, setName] = useState('')
  // const [desc, setDesc] = useState('')
  const [isDelete] = useState(false)

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

  return (
    <div className={classes.root}>
      <div className={classes.titlepage}>
        Back to all modules
        <Typography variant="h6"></Typography>
        <Typography variant="h4">Networking Fundamentals</Typography>
        <Typography variant="h6">
          Understand the core security issues with web applications, and learn
          how to exploit them using industry tools and techniques
        </Typography>
      </div>
      <Grid container>
        <Grid item xl={8}>
          {tasks.map((data, id) => (
            <ListModule key={id} {...data} />
          ))}
        </Grid>
      </Grid>
    </div>
  )
}
