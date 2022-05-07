import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import React from 'react'

export default function ToobarAdmin() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    titlepage: {
      padding: theme.spacing(3, 2),
      color: '#fff',
      background: '#000',
    },
    toolbarSecondary: {
      background: '#000',
      color: '#fff',
      padding: theme.spacing(1, 2),
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    toolbar: { borderBottom: `1px solid ${theme.palette.divider}` },
    dashboard: {
      padding: theme.spacing(2, 2),
    },
  }))
  const classes = useStyles()
  return (
    <div>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          color="inherit"
          noWrap
          variant="h6"
          href="/adminprofile"
          className={classes.toolbarLink}
        >
          {/* Course Management */}
          Setting Course
        </Link>
        <Link
          color="inherit"
          noWrap
          variant="h6"
          href="/usersetting"
          className={classes.toolbarLink}
        >
          User Management
        </Link>
      </Toolbar>
    </div>
  )
}
