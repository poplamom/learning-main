import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  footer: {
    backgroundColor: '#000',
    padding: theme.spacing(2),
    color: '#fff',
    bottom: '0',
    width: '100%',
    maxWidth: '1280px',
    position: 'fixed',
  },
}))
export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography component="h5" align="center" gutterBottom>
          Copyright Practicing and Learning System
        </Typography>
      </Container>
    </footer>
  )
}
