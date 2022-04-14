import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import ListRoom from './ListRoom'
import axios from 'axios'

export default function ManageRoom() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    btnCreate: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1em',
    },
    room: {
      padding: '2em',
    },
  }))
  const classes = useStyles()

  const [course, setCourse] = useState([])
  const token = localStorage.getItem('accessToken')
  const [cCount, setCount] = useState(0)
  const [isDeletes, setDeletes] = useState(false)

  useEffect(() => {
    const getCourse = async () => {
      const { data } = await axios.get('/api/v1/courses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(data)

      setCourse(data.courses)
    }
    getCourse()
  }, [isDeletes])

  const listRooms = (course || []).map((item, i) => (
    <ListRoom
      key={i}
      {...item}
      isDeletes={isDeletes}
      setDeletes={setDeletes}
    ></ListRoom>
  ))

  return (
    <div className={classes.root}>
      <Grid container className={classes.btnCreate}>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          href="/createroom"
        >
          Create Course
        </Button>
      </Grid>
      <Grid container className={classes.room}>
        {listRooms}
      </Grid>
    </div>
  )
}
