import React from "react"
import Modal from "@material-ui/core/Modal"
import {
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import request from "../../axios/post"
import putRequest from "../../axios/put"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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

const AddNewCenter = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)

  const handleClose = () => {
    props.setopen(false)
  }

  const formik = useFormik({
    initialValues: {
      zone: props.data ? props.data.zone : "",
      location: props.data ? props.data.location : "",
      state: props.data ? props.data.state : "",
      name: props.data ? props.data.name : "",
      address: props.data ? props.data.address : "",
      pinCode: props.data ? props.data.pinCode : "",
      person: props.data ? props.data.person : "",
      directNumber: props.data ? props.data.directNumber : "",
      contact: props.data ? props.data.contact : "",
      email: props.data ? props.data.email : "",
      id: props.data ? props.data._id : "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response =
        props.mode === "add"
          ? await request(`/service-centers`, values, token)
          : await putRequest(
              `/service-centers/${props.data._id}`,
              values,
              token
            )
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            open: true,
            msg: `${response.data.msg}`,
          },
        })
        props.setreloadDetails(true)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            open: true,
            msg: response.data,
          },
        })
      }
      props.setopen(false)
    },
  })

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>Service Center</Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                size="small"
                name="name"
                label="Service center name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>

            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                size="small"
                name="location"
                label="location"
                variant="outlined"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                multiline
                row={5}
                fullWidth
                name="address"
                label="Address"
                variant="outlined"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                size="small"
                name="person"
                label="Service center Person"
                variant="outlined"
                value={formik.values.person}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="state"
                size="small"
                label="State"
                variant="outlined"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                style={{ marginRight: "10px" }}
                size="small"
                name="zone"
                label="Zone"
                variant="outlined"
                value={formik.values.zone}
                onChange={formik.handleChange}
              />
              <TextField
                style={{ marginRight: "10px" }}
                size="small"
                name="pinCode"
                label="Pin Code"
                variant="outlined"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                size="small"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                style={{ marginRight: "10px" }}
                size="small"
                name="contact"
                label="Contact"
                variant="outlined"
                value={formik.values.contact}
                onChange={formik.handleChange}
              />
              <TextField
                name="directNumber"
                size="small"
                label="Direct Contact"
                variant="outlined"
                value={formik.values.directNumber}
                onChange={formik.handleChange}
              />
            </div>

            <div className={classes.submitButtonContainer}>
              <Button variant="contained" type="submit" color="primary">
                {props.mode === "add" ? "Submit" : "Update"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default AddNewCenter
