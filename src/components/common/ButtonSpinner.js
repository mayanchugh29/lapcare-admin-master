import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

// Inspired by the former Facebook spinners.
const useStyles = makeStyles((theme) => ({
  bottom: {
    color: "#fcc101",
  },
  top: {
    color: "#fcc101",
    animationDuration: "550ms",
  },
  circle: {
    strokeLinecap: "round",
  },
}))

export default function ButtonSpinner(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={25}
        thickness={5}
        {...props}
      />
    </div>
  )
}
