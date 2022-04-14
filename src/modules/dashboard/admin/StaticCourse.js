import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import ToobarAdmin from './ToobarAdmin'
import GanaralSetting from './GanaralSetting'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import StaticDisplay from './StaticDisplay'
export default function StaticCourse() {
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
  const [user, setCourse] = useState([])
  const userall = []

  const [userdata, setUser] = useState([])
  const [username, setUsername] = useState([])

  const getUser = async () => {
    const { data } = await axios.get(
      `/api/v1/progresses/finduserenroll/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    setUser(data.users)
    // setCourse(data.progresses.courseId);
  }

  useEffect(() => {
    getUser()
  }, [])

  for (let key in userdata) {
    let i = 0
    let values

    // get the value
    values = userdata[key]
    username.push(values.user[0].name)
    userall.push(values.userId)
    // console.log(value);
    console.log('loop i =' + i)

    i++
  }
  console.log(userall)
  console.log(username)

  const staticlist = (userall || []).map((item, i) => {
    return (
      <StaticDisplay
        key={i}
        username={username[i]}
        user={userall[i]}
        course={id}
      ></StaticDisplay>
    )
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
            Static list user learn course
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {staticlist}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
