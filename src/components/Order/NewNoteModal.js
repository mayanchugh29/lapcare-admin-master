import React from "react"
import Modal from "@material-ui/core/Modal"
import { useFormik } from "formik"
import postRequest from "../../axios/post"
import { connect, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"
import {
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    p: 4,
    outline: "none",
  },
  title: {
    textAlign: "center",
    fontWeight: "medium",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  inputDivs: {
    margin: 20,
  },
  submitButtonContainer: {
    textAlign: "center",
  },
})

const NewNoteModal = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      note: "",
    },
    onSubmit: async (values) => {
      const { note } = values
      const orderId = props.orderId
      const response = await postRequest(
        "/order/notes/new",
        { note, orderId },
        props.token
      )
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "New Note Added!",
            type: "success",
            open: true,
          },
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "New Note could not be added!",
            type: "error",
            open: true,
          },
        })
      }
      handleClose()
    },
  })

  const handleClose = () => {
    props.onClose()
  }

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>New Note</Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                id="note"
                name="note"
                label="Edit Note"
                variant="outlined"
                onChange={formik.handleChange}
                multiline
                rows={8}
              />
            </div>
            <div className={classes.submitButtonContainer}>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(NewNoteModal)
