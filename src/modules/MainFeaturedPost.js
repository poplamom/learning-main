import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { LocalLibrary, CloudCircle } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: 0,
    margin: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#000',
  },
  description: {
    color: '#fff',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(9),
      paddingRight: 0,
      paddingLeft: 0,
    },
    textAlign: 'center',
    color: '#66FCF1',
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(10),
  },
  featureicon: {
    display: 'flex',
    color: '#fff',
    justifyContent: 'center',
    //   direction: 'row',
    position: 'relative',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(9),
      paddingLeft: theme.spacing(9),
      paddingBottom: theme.spacing(10),
    },
  },
  icontsize: {
    fontSize: 100,
  },
  textBottom: {
    color: '#000',
    justifyContent: 'center',
    // direction: 'row',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(9),
      paddingLeft: theme.spacing(9),
      paddingBottom: theme.spacing(10),
    },
  },
  positonTextright: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}))

export default function MainFeaturedPost(props) {
  const classes = useStyles()
  const { post } = props

  return (
    <>
      <Paper className={classes.mainFeaturedPost}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" gutterBottom>
                {post.title}
              </Typography>
              <Typography className={classes.description} gutterBottom>
                {post.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container className={classes.featureicon} spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <LocalLibrary className={classes.icontsize}></LocalLibrary>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h4" gutterBottom>
              Guides
            </Typography>
            <Typography>
              Develop your skills by working through hands-on guided tasks and
              supporting videos.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CloudCircle className={classes.icontsize}></CloudCircle>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h4" gutterBottom>
              Challenges
            </Typography>
            <Typography>
              Learn and test your skills with gamified, real-world cybersecurity
              challenges.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3} className={classes.textBottom}>
        <Grid item md={7}>
          <Typography variant="h4" gutterBottom>
            Byte-sized gamified lessons
          </Typography>
          <Typography>
            Learning cybersecurity on TryHack is fun and addictive. Earn points
            by answering questions, taking on challenges and maintain your
            hacking streak through short lessons.
          </Typography>
        </Grid>

        <Grid item md={4} className={classes.positonTextright}>
          <LocalLibrary className={classes.icontsize}></LocalLibrary>
        </Grid>
        <Grid item md={4}>
          <LocalLibrary className={classes.icontsize}></LocalLibrary>
        </Grid>
        <Grid item md={7}>
          <Typography
            variant="h4"
            gutterBottom
            className={classes.positonTextright}
          >
            Learn, Practice and Complete
          </Typography>
          <Typography>
            Learn by following a structured pathway or guide your own learning.
            Start your own private hackable machines (no sharing) and use your
            skills in a real-world environment by completing guided,
            objective-based tasks.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
