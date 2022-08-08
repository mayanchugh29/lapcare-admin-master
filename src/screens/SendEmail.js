import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Card,
  CardContent,
} from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import request from "../axios/post"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import TextEditor from "../components/Product/TextEditor"
import { withRouter } from "react-router"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "90px",
  },
  page_content: {
    width: "90%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1rem .5rem",
  },
  buttons: {
    display: "inline-block",
  },
  card: {
    padding: "14px",
  },
  textfield: {
    margin: "14px 0",
  },
})

const SendEmail = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const state = props.location.state
  const formik = useFormik({
    initialValues: {
      subject: "",
      recipientEmail: state !== undefined ? state.email[0].value : "",
      messsage: "",
    },
    onSubmit: async (values) => {
      const response = await request("/email/create", values, token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            msg: "Email Delivered!",
            open: true,
          },
        })
        formik.resetForm()
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            msg: "Email could not be delivered!",
            open: true,
          },
        })
      }
    },
  })
  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              Create New Email
            </Typography>
            <div className={classes.buttons}>
              <Button
                disableElevation
                variant="contained"
                type="submit"
                color="primary">
                Send Email
              </Button>
            </div>
          </div>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                name="recipientEmail"
                label="Recipient Email"
                autoComplete="off"
                variant="outlined"
                className={classes.textfield}
                onChange={formik.handleChange}
                value={formik.values.recipientEmail}
                fullWidth
                spellCheck="false"
              />
              <TextField
                name="subject"
                label="Subject"
                autoComplete="off"
                variant="outlined"
                className={classes.textfield}
                onChange={formik.handleChange}
                value={formik.values.subject}
                fullWidth
                spellCheck="false"
              />
              <TextEditor
                fieldName="message"
                value={formik.values.messsage}
                setFieldValue={formik.setFieldValue}
              />
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default withRouter(SendEmail)
