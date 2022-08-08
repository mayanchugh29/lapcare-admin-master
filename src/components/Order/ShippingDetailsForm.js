import {
  Modal,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import request from "../../axios/post"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    padding: "10px 20px",
    outline: "none",
  },
  title: {
    textAlign: "center",
    fontWeight: "medium",
    fontSize: "1.3rem",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textfield: {
    margin: "7px 0",
  },
})

const ShippingDetailsForm = (props) => {
  const token = useSelector((state) => state.authReducer.token)
  const dispatch = useDispatch()
  const classes = useStyles()
  const handleClose = () => {
    props.setshippingModal(false)
  }
  const formik = useFormik({
    initialValues: {
      courier_name: "",
      shipment_id: "",
      awb_code: "",
      order_id_shiprocket: "",
      order_id_lapcare: props.orderId,
      cod: props.paymentMethod === "COD" ? 1 : 0,
    },
    onSubmit: async (values) => {
      const response = await request("/shipment/add", values, token)
      if (response.status === 200) {
        props.setshipment(values)
        props.setisShipped(true)
        props.setcurrentOrderStatus((prev) => [
          ...prev,
          { status: "Order Shipped" },
        ])
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            msg: "Shipment Details Saved!",
            open: true,
          },
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            msg: "Something went wrong!",
            open: true,
          },
        })
      }
      props.setshippingModal(false)
    },
  })
  return (
    <Modal open={props.shippingModal} onClose={handleClose}>
      <Card className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Shipment Details
            </Typography>

            <TextField
              name="courier_name"
              label="Courier Name"
              autoComplete="off"
              variant="outlined"
              size="small"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />
            <TextField
              name="shipment_id"
              label="Shipment Id"
              autoComplete="off"
              variant="outlined"
              size="small"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />
            <TextField
              name="awb_code"
              label="Awb Code"
              autoComplete="off"
              variant="outlined"
              size="small"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />
            <TextField
              name="order_id_shiprocket"
              label="Shiprocket Order Id"
              autoComplete="off"
              variant="outlined"
              size="small"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />
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
              type="submit"
              disableElevation
              variant="contained"
              color="primary">
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  )
}

export default ShippingDetailsForm
