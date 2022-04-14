import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ToobarAdmin from './ToobarAdmin'
import GanaralSetting from './GanaralSetting'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
export default function UpdateRoom() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
    linkSetting: {
      textDecoration: 'none',
    },
  }))
  const classes = useStyles()
  const location = useLocation()
  const token = localStorage.getItem('accessToken')

  const { id } = location.state
  const [course, setCourse] = useState([])

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [tasks, setTasks] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setCourse(data.course)
        setName(data.course.name)
        setDesc(data.course.desc)
        setTasks(data.course.tasks)
      } catch (error) {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={classes.root}>
      <ToobarAdmin></ToobarAdmin>

      <div className={classes.titlepage}>
        <Typography variant="h4">Update Room</Typography>
        <Typography variant="h6">Update Room and Setting</Typography>
      </div>
      <Grid container className={classes.updateRoom}>
        <Grid container item xl={2}>
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

        <Grid container item xl={10}>
          <Typography variant="h5" color="initial">
            Course setting
          </Typography>
          <Grid container>
            <GanaralSetting key={id} {...course} id={id}></GanaralSetting>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
