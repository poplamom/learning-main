import React, { useState, useEffect } from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import swal from 'sweetalert'
import { BorderBottom } from '@material-ui/icons'

export default function ListQuestion({
  id,
  name,
  answer,
  hint,

  isDelQuest,
  setDelQuest,
  setDisabledQuest,
  disabledQuest,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    all: {
      paddingBottom: '2em',
      marginTop: '2em',
      borderBottom: '1px black solid',
    },
    txtFildQandA: {
      paddingRight: '0.5em',
      width: '45em',
      margin: '1em 0',
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
  const [quests, setQuest] = useState([])

  const [Qnames, setQName] = useState(name)
  const [Qhint, setQHint] = useState(hint)

  const [Qanswer, setAnswer] = useState(answer)

  const [disabledQuests, setDisabledQuests] = useState(true)

  const [Qfield, setQFields] = useState([])
  const [data, setData] = useState()

  const updateQuest = async (e) => {
    e.preventDefault()
    console.log(token)

    const bodyParameters = { Qnames, Qanswer, id }
    console.log(bodyParameters)
    await axios
      .patch(
        `/api/v1/questions/${id}`,
        { name: Qnames, answer: Qanswer, hint: Qhint },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setData(response.data.task)

        // console.log(response);
        // console.log(response.data) ;
        swal('Success', 'Update Success', 'success', {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          console.log('UPDATE')
          setDisabledQuest(!disabledQuest)
          setDisabledQuests(!disabledQuests)
        })
      })
      .catch((error) => {
        swal('Failed', 'Error', 'error')

        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }
  const fnDelete = async () => {
    try {
      const { data } = await axios.delete(`api/v1/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDelQuest(!isDelQuest)
      console.log('delete ' + isDelQuest)
    } catch (error) {
      console.log(error.response.status) // 401
      console.log(error.response.data.error)
    }
  }

  const confirmDelete = () => {
    swal({
      title: 'Are you sure delete?',
      text: 'You will delete this Task',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(function (isConfirm) {
      /*Your Code Here*/
      if (isConfirm) {
        fnDelete()
        console.log(' Yes')
      } else {
        console.log(' No')
      }
    })
  }
  const editQuest = () => {
    setDisabledQuests(false)
  }
  const cancleEditTask = () => {
    setDisabledQuests(true)
  }
  const BtnUpdatQuest = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.savebtn}
          onClick={updateQuest}
        >
          Update
        </Button>
        <Button
          variant="contained"
          onClick={cancleEditTask}
          className={classes.savebtn}
        >
          Cancle
        </Button>
      </>
    )
  }
  const BtnEditQuest = () => {
    return (
      <Button
        variant="contained"
        className={classes.savebtn}
        onClick={editQuest}
        color="primary"
      >
        Edit
      </Button>
    )
  }
  return (
    <Grid container className={classes.all}>
      <Grid container item xl={8}>
        <form noValidate autoComplete="off" onSubmit={updateQuest}>
          <TextField
            className={classes.txtFildQandA}
            label="Questions"
            variant="outlined"
            value={Qnames}
            disabled={disabledQuests}
            onChange={(e) => setQName(e.target.value)}
          />
          <TextField
            className={classes.txtFildQandA}
            label="Answers"
            variant="outlined"
            value={Qanswer}
            disabled={disabledQuests}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <TextField
            className={classes.txtFildQandA}
            label="Hint"
            variant="outlined"
            id="hint"
            value={Qhint}
            disabled={disabledQuests}
            onChange={(e) => setQHint(e.target.value)}
          />
          {/* <Button
            variant="contained"
            color="primary"
            className={classes.savebtn}
            type="submit"
          >
            update
          </Button> */}
        </form>
      </Grid>

      <Grid item xl={4} className={classes.groupBtn}>
        {disabledQuests ? <BtnEditQuest /> : <BtnUpdatQuest />}
        <Button variant="contained" color="secondary" onClick={confirmDelete}>
          Delete
        </Button>{' '}
      </Grid>
    </Grid>
  )
}
