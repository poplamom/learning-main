import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Links from '@material-ui/core/Link'
import Mymodule from './MyModule'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  toolbar: { borderBottom: `1px solid ${theme.palette.divider}` },
  dashboard: {
    padding: theme.spacing(3, 2),
  },
  btnSetting: {
    textAlign: 'center',
  },
}))

export default function UserPofile() {
  const token = localStorage.getItem('accessToken')

  const classes = useStyles()
  const [user] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('user')
    const initialValue = JSON.parse(saved)

    return initialValue || ''
  })
  const userId = user.id
  const [progress, setProgress] = useState([])

  // const [mycourse, setCourse] = useState([])
  const courses = []
  // var questionCount = []
  // const [data, setData] = useState([])
  // var bodyParameters
  const getCourse = async () => {
    const { data } = await axios.get(`/api/v1/progresses/mycourse/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setProgress(data.progresses)
    // setCourse(data.progresses.courseId);
  }

  for (let key in progress) {
    let i = 0
    let value

    // get the value
    value = progress[key]
    courses.push(value.course[i])
    // console.log(value)
    // console.log('loop i =' + i)

    i++
  }

  // console.log(coursee)
  // console.log(progress)

  useEffect(() => {
    getCourse()
  }, [])

  // const courselist = (courses || []).map((item, i) => {
  const courselist = courses.map((item, i) => {
    return <Mymodule key={i} {...item} />
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

      <Grid container className={classes.dashboard}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            My Course
            {courselist}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
