import { Grid, Button, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
export default function QandA({ idcourse, idtask, isAddQ, setAddQ }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    all: {
      paddingBottom: '1em',
    },
    txtFildQandA: {
      marginBottom: '1.5em',
      width: '65em',
    },
    groupQandA: {
      padding: '2em 0',
    },
    addbtn: {
      textAlign: 'right',
    },
    savebtn: {
      marginRight: '0.5em',
    },
    groupBtn: {
      textAlign: 'center',
      paddingBottom: '2em',
    },
  }))
  const classes = useStyles()

  const token = localStorage.getItem('accessToken')
  const location = useLocation()
  // const { id } = location.state;
  const [data, setData] = useState()
  const [datatask, setDataTask] = useState()

  const [taskID, setTaskId] = useState(idtask)
  const [courseID, setCourseId] = useState(idcourse)

  const [name, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const [hint, setHint] = useState('')
  console.log('id course' + idcourse)

  const createQandA = async (e) => {
    e.preventDefault()

    console.log(idtask)
    setTaskId(idtask)
    // console.log("id course"+courseID);

    const bodyParameters = { name, answer, hint, courseID, taskID }
    console.log('question = ' + JSON.stringify(bodyParameters))
    await axios
      .post('/api/v1/questions', bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDataTask(response.data.task)
        setQuestion('')
        setAnswer('')
        setHint('')

        setAddQ(!isAddQ)
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }

  return (
    <Grid container>
      <Grid item xl={12} className={classes.all}>
        <form noValidate autoComplete="off" onSubmit={createQandA}>
          <TextField
            className={classes.txtFildQandA}
            label="Question"
            variant="outlined"
            id="name"
            value={name}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <TextField
            className={classes.txtFildQandA}
            label="Answer"
            variant="outlined"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <TextField
            className={classes.txtFildQandA}
            label="Hint"
            variant="outlined"
            id="hint"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
        </form>
      </Grid>

      <Grid item xl={12} className={classes.groupBtn}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={createQandA}
          className={classes.savebtn}
        >
          Save Question
        </Button>
      </Grid>
    </Grid>
  )
}
