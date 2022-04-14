import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Toolbar from '@material-ui/core/Toolbar'
import Links from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ModuleItem from './ModuleItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {
    display: 'inline-block',
  },
  allitem: {
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  titlepage: {
    padding: theme.spacing(3, 2),
  },
  toolbarSecondary: {
    background: '#000',
    color: '#fff',
    padding: theme.spacing(3, 2),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))

export default function MyModule() {
  const classes = useStyles()
  // const users = localStorage.getItem('user')
  const [updateEnroll, setupdateEnroll] = useState(false)

  const [course, setCourse] = useState([])
  const [progress, setProgress] = useState([])
  const token = localStorage.getItem('accessToken')

  const [user] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('user')
    const initialValue = JSON.parse(saved)

    return initialValue || ''
  })

  const id = user.id

  console.log('user id = ' + id)

  const getCourse = async () => {
    const { data } = await axios.get('/api/v1/courses', {
      headers: { Authorization: `Bearer ${token}` },
    })

    setCourse(data.courses)
  }
  const getProgress = async () => {
    const { data } = await axios.get(`/api/v1/progresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setProgress(data.progress)
    console.log(data)
  }
  useEffect(() => {
    getCourse()
    getProgress()
  }, [updateEnroll])

  console.log(course)
  console.log(progress)

  const courselist = (course || []).map((item, i) => {
    var cc = item.id

    var enroll
    const aa = (progress || []).map((item2, j) => {
      if (item2.courseId === cc) {
        return true
      } else {
        return false
      }
    })

    if (aa.includes(true)) {
      enroll = true
    } else {
      enroll = false
    }

    console.log('loop ' + cc + ' have ' + enroll)

    return (
      <ModuleItem
        key={i}
        updateEnroll={updateEnroll}
        setupdateEnroll={setupdateEnroll}
        {...item}
        btn={enroll}
      />
    )
  })

  return (
    <div className={classes.root}>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Links
          color="inherit"
          noWrap
          variant="h6"
          className={classes.toolbarLink}
          href="/allmodule"
        >
          All Course
        </Links>
        <Links
          color="inherit"
          noWrap
          variant="h6"
          className={classes.toolbarLink}
          href="/userprofile"
        >
          My Course
        </Links>
        <Links
          color="inherit"
          noWrap
          variant="h6"
          className={classes.toolbarLink}
          href="/settingprofile"
        >
          Setting
        </Links>
      </Toolbar>
      <div className={classes.titlepage}>
        <Typography variant="h4">Modules</Typography>
        <Typography variant="h6">
          Modules are made up of bite-sized rooms
        </Typography>
      </div>

      <Grid container className={classes.allitem} spacing={2}>
        {courselist}
      </Grid>
    </div>
  )
}
