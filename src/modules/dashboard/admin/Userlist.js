import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
export default function Userlist({
  id,
  email,
  avatar,
  name,
  role,
  isDelUser,
  setDelUser,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    allRoom: {
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #c1c1c1',
      borderRadius: '25px',
      padding: '1em 0',
      maxWidth: '31%',
      margin: '1em',
    },
    userList: {
      paddingRight: '2em',
      textDecoration: 'none',
      color: '#000',
    },
    btncreate: {
      marginLeft: '0.5em',
    },
  }))
  const classes = useStyles()
  const token = localStorage.getItem('accessToken')

  const userDelete = async () => {
    try {
      const { data } = await axios.delete(`api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDelUser(!isDelUser)
    } catch (error) {
      console.log(error.response.status) // 401
      console.log(error.response.data.error)
    }
  }

  const confirmDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'You will delete this user',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(function (isConfirm) {
      /*Your Code Here*/
      if (isConfirm) {
        userDelete()
        console.log(isDelUser)
        console.log(' Yes')
      } else {
        console.log(' No')
      }
    })
  }
  return (
    <Grid container className={classes.allRoom} xl={4}>
      <Grid container item xl={6}>
        <Link
          to={{ pathname: `updateuser/${id}`, state: { id } }}
          className={classes.userList}
        >
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          <Typography variant="subtitle1" color="initial">
            {email}
          </Typography>
          <Typography variant="subtitle1" color="initial">
            {name}
          </Typography>
        </Link>
      </Grid>
      <Grid item container xl={2} className={classes.btncreate}>
        <Button
          variant="contained"
          color="secondary"
          onClick={confirmDelete}
          key={id}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  )
}
