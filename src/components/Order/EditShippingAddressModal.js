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
import request from '../../axios/put'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"


const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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

const EditShippingAddressModal = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)


  const handleClose = () => {
    props.onClose()
  }
  

  const formik = useFormik({
    initialValues:{
      fullName:props.data.fullName,
      addressLine1:props.data.addressLine1,
      addressLine2:props.data.addressLine2,
      city:props.data.city,
      pinCode:props.data.pinCode,
      state:props.data.state,
      phoneNumber:props.data.phoneNumber,
      landmark:props.data.landmark,
      orderId:props.orderId
    },
    onSubmit:async(values)=>{
      const response = await request('/order/address',values,token)
      if (response.status === 200) {
        props.setshippingAddress(values)
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            open: true,
            msg: "Shipping address updated!"
          }
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            open: true,
            msg: response.data
          }
        })
      }
      props.onClose()
    }
  })

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>Shipping Address</Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                variant="outlined"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
            </div>

            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="addressLine1"
                label="Address Line 1"
                variant="outlined"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="addressLine2"
                label="Address Line 2"
                variant="outlined"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="landmark"
                label="Landmark"
                variant="outlined"
                value={formik.values.landmark}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                style={{ marginRight: "10px" }}
                name="city"
                label="City"
                variant="outlined"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              <TextField 
                name="state" 
                label="State" 
                variant="outlined" 
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                style={{ marginRight: "10px" }}
                name="pinCode"
                label="Pin Code"
                variant="outlined"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
              />
              <TextField 
                name="phoneNumber" 
                label="Phone Number" 
                variant="outlined" 
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.submitButtonContainer}>
              <Button variant="contained" type="submit" color="primary">
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default EditShippingAddressModal
