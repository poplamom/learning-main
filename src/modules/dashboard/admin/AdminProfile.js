import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ManageRoom from './ManageRoom'
import ToobarAdmin from './ToobarAdmin'

export default function AdminProfile() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    titlepage: {
      padding: theme.spacing(2, 2),
      color: '#fff',
      background: '#000',
    },
  }))
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ToobarAdmin></ToobarAdmin>

      <div className={classes.titlepage}>
        <Typography variant="h4">Setting Course</Typography>
        <Typography variant="h6">Create a Course</Typography>
      </div>
      <Grid container>
        <ManageRoom></ManageRoom>
      </Grid>
    </div>
  )
}
