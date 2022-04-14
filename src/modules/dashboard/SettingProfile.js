import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, TextField, InputLabel } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Links from '@material-ui/core/Link'
import axios from 'axios'
import swal from 'sweetalert'

export default function SettingProfile() {
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
    formCrate: {
      justifyContent: 'center',
      '& div': {
        padding: theme.spacing(1),
      },
    },
    textField: {
      width: '30em',
      padding: '2em 0',
    },
    btnSetting: {
      textAlign: 'center',
    },
  }))

  const token = localStorage.getItem('accessToken')
  const classes = useStyles()
  const [disabledBtn, setDisableBtn] = useState(false)
  const [datas, setData] = useState()
  const [names, setName] = useState('')
  const [password, setPass] = useState('')
  const [email, setEmail] = useState('')
  const [user] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('user')
    const initialValue = JSON.parse(saved)

    return initialValue || ''
  })
  const id = user.id

  const getProfile = async () => {
    await axios
      .get(`/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data)
        setName(response.data.user.name)
        setEmail(response.data.user.email)

        console.log(response.data)
        setDisableBtn(!disabledBtn)
        console.log(response.data.user.email)

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  const Update = async (e) => {
    e.preventDefault()

    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // }

    const bodyParameters = { names, password, email }
    console.log(bodyParameters)
    await axios
      .patch(
        `/api/v1/users/${id}`,
        { name: names, password: password, email: email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setData(response.data)
        console.log(datas)
        swal('Success', 'Update Success', 'success', {
          // buttons: false,
          timer: 2000,
        }).then((value) => {
          console.log('UPDATE')
          setDisableBtn(!disabledBtn)

          // localStorage.setItem("user", JSON.stringify(response["user"]));
          // window.location.href = "/adminprofile";
        })
      })
      .catch((error) => {
        swal('Failed', 'Error', 'error')

        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }
  const editProfile = () => {
    setDisableBtn(false)
  }
  const cancleEditProfile = () => {
    setDisableBtn(true)
  }
  const BtnUpdatProfile = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onSubmit={Update}
        >
          Update
        </Button>
        <Button variant="contained" onClick={cancleEditProfile}>
          Cancle
        </Button>
      </>
    )
  }
  const BtnEdit = () => {
    return (
      <Button variant="contained" color="primary" onClick={editProfile}>
        Edit
      </Button>
    )
  }
  return (
    <div>
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
      <div className={classes.formCrate}>
        <Typography variant="h5">Setting Profile</Typography>
        <form noValidate autoComplete="off" onSubmit={Update}>
          <div>
            <InputLabel htmlFor="Username">Username</InputLabel>
            <TextField
              variant="outlined"
              id="Username"
              value={names}
              disabled={disabledBtn}
              onChange={(e) => setName(e.target.value)}
              className={classes.textField}
            />
          </div>
          <div>
            <InputLabel htmlFor="Passsword">Passsword</InputLabel>
            <TextField
              id="Passsword"
              variant="outlined"
              value={password}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              disabled={disabledBtn}
              className={classes.textField}
            />
          </div>
          <div>
            <InputLabel htmlFor="Email">Email</InputLabel>
            <TextField
              id="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabledBtn}
              className={classes.textField}
            />
          </div>
          <div className={classes.btnSetting}>
            {disabledBtn ? <BtnEdit /> : <BtnUpdatProfile />}
          </div>
        </form>
      </div>
    </div>
  )
}
