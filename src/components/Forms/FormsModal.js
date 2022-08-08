import React from "react"
import {
  Card,
  makeStyles,
  Typography,
  Grid,
  Modal,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core"
import { withRouter } from "react-router"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    padding: "10px 20px",
    outline: "none",
  },
  title: {
    textAlign: "center",
    fontWeight: "medium",
    fontSize: "1.3rem",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "4px",
  },
  value: {
    border: "1px solid #777",
    padding: "4px",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
})

const FormsModal = (props) => {
  const classes = useStyles()

  const handleClose = () => {
    props.onClose()
  }

  const handleSubmit = () => {
    if (props.operation === "Reply") {
      props.history.push({
        pathname: "/send-email",
        state: { email: props.values.filter((e) => e.field === "Email") },
      })
    }

    if (props.operation === "Download File") {
      props.history.push()
    }
  }

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>Details</Typography>
          <Grid container spacing={4}>
            {props.values.map((value) => (
              <Grid item xs={6}>
                <div className={classes.content}>
                  <div className={classes.field}>
                    <Typography variant="subtitle1">{value.field}</Typography>
                  </div>
                  <div className={classes.value}>
                    <Typography>{value.value}</Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          <Button
            disableElevation
            variant="outlined"
            color="primary"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleSubmit}>
            {props.operation}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  )
}

export default withRouter(FormsModal)
