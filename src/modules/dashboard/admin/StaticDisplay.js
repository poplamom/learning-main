import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import PersonIcon from '@mui/icons-material/Person'

export default function StaticDisplay({ username, course, user }) {
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
  const token = localStorage.getItem('accessToken')
  const [datas, setData] = useState([])
  const [datas2, setData2] = useState([])

  const [courseId] = useState(course)
  const [userId] = useState(user)

  var maxquetsion = 0
  var valueprocess = 0
  var calpersent
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 40 }}>
          <Typography variant="body2">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    )
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  }
  // const BorderLinearProgress = withStyles((theme) => ({
  //   root: {
  //     height: 10,
  //     borderRadius: 5,
  //   },
  //   colorPrimary: {
  //     backgroundColor:
  //       theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  //   },
  //   bar: {
  //     borderRadius: 5,
  //     backgroundColor: '#1a90ff',
  //   },
  // }))(LinearProgressWithLabel)

  const bodyParameters = { courseId, userId }

  const countQuestion = async (e) => {
    await axios
      .post('/api/v1/progressesdetail/couters2', bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.counter === 0) {
          setData(null)
        } else {
          setData(response.data.counter)
        }
        console.log(response.data)

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }
  const bodyParameters2 = { courseId }

  const coutAllQuestion = async (e) => {
    await axios
      .post('/api/v1/questions/couters', bodyParameters2, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.counter === 0) {
          setData2(null)
        } else {
          setData2(response.data.counter)
        }
        // console.log(response.data.counter);

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }
  useEffect(() => {
    countQuestion()
    coutAllQuestion()
    // getUserEnroll();
  }, [])
  // console.log(datas)
  if (datas !== null) {
    valueprocess = datas.length
  } else {
    valueprocess = 0
  }

  if (datas2 !== null) {
    maxquetsion = datas2.length
  } else {
    maxquetsion = 0
  }

  console.log('value datas2 = ' + datas2)

  calpersent = Math.ceil((valueprocess * 100) / maxquetsion)
  console.log('value process = ' + valueprocess)
  console.log('value maxquetsion = ' + maxquetsion)
  console.log('value calpersent = ' + calpersent)

  var progressBar
  if (calpersent > 0) {
    progressBar = <LinearProgressWithLabel value={calpersent} />
  } else if (calpersent === 0) {
    progressBar = <LinearProgressWithLabel value={0} />
  } else {
    progressBar = <LinearProgressWithLabel value={0} />
  }
  return (
    <div>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <PersonIcon color="primary" />
          </ListItemAvatar>
          <ListItemText primary={username} />
        </ListItem>
        {progressBar}
      </List>
    </div>
  )
}
