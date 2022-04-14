import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import swal from 'sweetalert'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}))

export default function Signin() {
  const classes = useStyles()
  const [email, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [datas, setData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios
      .post('/api/v1/auth/sign-in', {
        email,
        password,
      })
      .then((response) => {
        setData(response.data)
        console.log(response.data)
        if ('token' in response.data) {
          swal('Success', 'Login Success', 'success', {
            // buttons: false,
            timer: 2000,
          }).then(async (value) => {
            localStorage.setItem('accessToken', response.data['token'])

            console.log(datas)

            await axios
              .get('/api/v1/auth/profile', {
                headers: { Authorization: `Bearer ${response.data['token']}` },
              })
              .then((res) => {
                const { user } = res.data
                localStorage.setItem('user', JSON.stringify(user))

                console.log(user)
                if (user['role'] === 'Member') {
                  window.location.href = '/userprofile'
                } else if (user['role'] === 'Admin') {
                  window.location.href = '/adminprofile'
                }
              })
          })
        } else {
          swal('Missing ', 'user or password failed', 'error')
        }
      })
      .catch((error) => {
        swal('Missing ', 'user or password failed', 'error')

        console.log(error.response.data.error)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setUserName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  )
}
