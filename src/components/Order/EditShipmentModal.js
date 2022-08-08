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

const EditShipmentModal = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)


  const handleClose = () => {
    props.setopen(false)
  }
  

  const formik = useFormik({
    initialValues:{
        courier_name: props.shipment.courier_name,
        shipment_id: props.shipment.shipment_id,
        awb_code: props.shipment.awb_code,
        order_id_shiprocket: props.shipment.order_id_shiprocket,
        label_url: props.shipment.label_url,
        manifest_url: props.shipment.manifest_url,
        courier_company_id: props.shipment.courier_company_id,
    },
    onSubmit:async(values)=>{
      const response = await request(`/shipments/${props.shipment._id}`,values,token)
      if (response.status === 200) {
        props.setshipment(response.data.shipment)
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            open: true,
            msg: "Shipment details updated!"
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
      props.setopen(false)
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
                name="courier_name"
                label="Courier Name"
                variant="outlined"
                value={formik.values.courier_name}
                onChange={formik.handleChange}
              />
            </div>

            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="awb_code"
                label="Awb Code"
                variant="outlined"
                value={formik.values.awb_code}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="shipment_id"
                label="Shipment Id"
                variant="outlined"
                value={formik.values.shipment_id}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                fullWidth
                name="order_id_shiprocket"
                label="OrderId Shiprocket"
                variant="outlined"
                value={formik.values.order_id_shiprocket}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                style={{ marginRight: "10px" }}
                name="courier_company_id"
                label="Courier Company Id"
                variant="outlined"
                value={formik.values.courier_company_id}
                onChange={formik.handleChange}
              />
              <TextField 
                name="label_url" 
                label="Label Url" 
                variant="outlined" 
                value={formik.values.label_url}
                onChange={formik.handleChange}
              />
            </div>
            <div className={classes.inputDivs}>
              <TextField
                style={{ marginRight: "10px" }}
                name="manifest_url"
                label="Manifest Url"
                variant="outlined"
                value={formik.values.manifest_url}
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

export default EditShipmentModal
