import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    padding: "8px",
    margin: "16px 0",
  },
  mainContainer: {
    margin: "16px auto 0",
  },
  noteDiv: {
    display: "flex",
    alignItems: "center",
  },
  circle: {
    borderRadius: "50%",
    height: "8px",
    width: "8px",
    background: "#777",
    marginRight: "10px",
  },
  line: {
    marginLeft: "3px",
    height: "70px",
    width: "1px",
    background: "#d5d5d5",
  },
  note: {
    fontSize: "1rem",
  },
  date: {
    color: "#555",
    fontSize: "0.9rem",
    marginLeft: "16px",
  },
})

const NotesCard = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">Notes</Typography>
        {props.notes.map((note, i) => (
          <div className={classes.mainContainer} key={i}>
            <Typography className={classes.date}>
              {new Date(note.date).toString()}
            </Typography>
            <div className={classes.noteDiv}>
              <div className={classes.circle}></div>
              <Typography className={classes.note}>{note.note}</Typography>
            </div>
            {i < props.notes.length - 1 ? (
              <div className={classes.line}></div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default NotesCard
