import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Questions from './Questions'
import axios from 'axios'

export default function Task({ no, name, desc, id }) {
  const useStyles = makeStyles((theme) => ({
    rootTask: {
      margin: '1rem 0',
    },
    headTask: {
      width: '100%',
    },
    contentTask: {
      border: '1px solid #2f2f2f',
      padding: '2rem',
    },
    btnMachine: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    question: {
      borderBottom: '1px solid #121212',
      paddingBottom: '2em',
      marginBottom: '2em',
    },
  }))
  const classes = useStyles()

  const token = localStorage.getItem('accessToken')
  const [question, setQuest] = useState([])
  const [taskId] = useState(id)
  // const [questionall, setQuestall] = useState([])
  const [progressDetail, setProgressDetail] = useState([])
  const users = localStorage.getItem('user')
  const user = JSON.parse(users)
  const [userId] = useState(user.id)
  // const [updateQuestion, setupdateQuestion] = useState(false)
  const [statusQuestion, setStatusQuestion] = useState(false)
  const [courseId, setCourseId] = useState()

  // const getQuestion = async () => {
  //   const { data } = await axios.get("/api/v1/questionall", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   setQuestall(data.question);
  //   console.log(data);

  // };

  const getProgressDetail = async () => {
    const { data } = await axios.get(`/api/v1/progressesdetail/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setProgressDetail(data.progressdetail)
  }
  const getQuest = async () => {
    const { data } = await axios.get(`/api/v1/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setQuest(data.task.question)
    setCourseId(data.task.courseId)
    console.log(JSON.stringify(data.task.question))
    console.log('id course = ' + data.task.courseId)
  }

  useEffect(() => {
    getQuest()
    getProgressDetail()
  }, [statusQuestion])

  const questionlist = (question || []).map((item, i) => {
    var idQuestion = item.id

    var statusQ
    const processes = (progressDetail || []).map((item2, j) => {
      console.log(item2)

      if (item2.questionId === idQuestion) {
        return true
      } else {
        return false
      }
    })

    if (processes.includes(true)) {
      statusQ = true
    } else {
      statusQ = false
    }

    console.log('task question id.' + idQuestion)
    console.log('loop ' + idQuestion + ' have ' + statusQ)

    return (
      <Questions
        key={i}
        {...item}
        courseId={courseId}
        taskIds={taskId}
        statusQuestion={statusQuestion}
        setStatusQuestion={setStatusQuestion}
        statusQ={statusQ}
      />
    )
  })

  return (
    <Grid container className={classes.rootTask} xl={12}>
      <Accordion className={classes.headTask}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography variant="h5">
            {no} :{name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={classes.contentTask}>
            <Grid item container xl={12} className={classes.question}>
              <Grid item xl={9}>
                <Typography
                  variant="subtitle1"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {desc}
                </Typography>
                {/* <div>{desc}</div> */}
              </Grid>
              <Grid item xl={3} container className={classes.btnMachine}></Grid>
            </Grid>
            <Grid container item>
              {questionlist}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}
