import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Grid, TextField } from '@material-ui/core'
import ToobarAdmin from './ToobarAdmin'
import axios from 'axios'
import swal from 'sweetalert'

export default function CrateRoom() {
  const useStyles = makeStyles((theme) => ({
    titlepage: {
      padding: theme.spacing(3, 2),
      color: '#fff',
      background: '#000',
    },
    input: {
      display: 'none',
    },
    formCrate: {
      justifyContent: 'center',
      textAlign: 'center',

      '& div': {
        padding: theme.spacing(1),
      },
    },
    textField: {
      width: '30em',
    },
  }))
  const classes = useStyles()
  const token = localStorage.getItem('accessToken')
  const [name, setCourse] = useState('')
  const [desc, setDesc] = useState('')
  const [data, setData] = useState('')
  const createRoom = async (e) => {
    e.preventDefault()
    console.log(token)

    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // }

    const bodyParameters = { name, desc }

    await axios
      .post('/api/v1/courses', bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data)
        console.log(data)
        swal('Success', 'Create Success', 'success', {
          // buttons: false,
          timer: 1000,
        }).then((value) => {
          // localStorage.setItem("user", JSON.stringify(response["user"]));
          window.location.href = '/adminprofile'
        })
      })
      .catch((error) => {
        swal('Failed', 'Email  duplicate', 'error')

        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }
  return (
    <div>
      <ToobarAdmin></ToobarAdmin>
      <div className={classes.titlepage}>
        <Typography variant="h4">Create Rooms</Typography>
        <Typography variant="h6">Create a room</Typography>
      </div>

      <Grid container className={classes.formCrate}>
        <form noValidate autoComplete="off" onSubmit={createRoom}>
          <div>
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="description"
              label="Description"
              className={classes.textField}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            {/* <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload image
              </Button>
            </label> */}
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Create Room
            </Button>
          </div>
        </form>
      </Grid>
    </div>
  )
}
