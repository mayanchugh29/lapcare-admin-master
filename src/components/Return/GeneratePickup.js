import React, { useState, useEffect } from "react"
import AppBarContent from "../common/appbar"
import { connect, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import request from "../../axios/post"
import getRequest from "../../axios/get"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"
import CircularIndeterminate from "../common/Spinner"

import {
  Typography,
  TextField,
  Card,
  makeStyles,
  CardContent,
  AppBar,
  Button,
  CircularProgress,
  Divider,
  Checkbox,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  Slide,
} from "@material-ui/core"
import CircleCheckedFilled from "@material-ui/icons/CheckCircle"
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked"
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined"
import CallRoundedIcon from "@material-ui/icons/CallRounded"
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded"
import PersonRoundedIcon from "@material-ui/icons/PersonRounded"
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded"

const useStyles = makeStyles({
  appBar: {
    zIndex: 1,
    backgroundColor: "#fcc101",
  },
  root: {
    width: "100%",
    marginTop: "75px",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem 0",
    padding: "0.5rem",
  },
  parentBox: {
    display: "block",
    padding: "2rem",
    margin: "1rem",
  },
  childBox: {
    display: "flex",
    flexFlow: "row wrap",
    width: "100%",
    boxShadow:
      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;",
    margin: "1rem 0",
    borderRadius: "5px",
    alignItems: "center",
    height: "fit-content",
    border: "2.5px solid transparent",
    "&:hover": {
      border: "2.5px solid #fdcf37",
    },
  },
  performance_rating_container: {
    padding: "1rem 2rem",
    margin: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  performance_rating_container__childDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexFlow: "column wrap",
    width: "15%",
  },
})

const GeneratePickup = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const orderData = props.data
  const [delivery_pincode, setdelivery_pincode] = useState()
  const [packageWeight, setpackageWeight] = useState(0.5)
  const [length, setlength] = useState()
  const [width, setwidth] = useState()
  const [height, setheight] = useState()
  const [showCouriers, setshowCouriers] = useState(false)
  const [availableCouriers, setavailableCouriers] = useState()
  const [selectedCourierId, setselectedCourierId] = useState()
  const [selectedCourierName, setselectedCourierName] = useState()
  const [avilablePincodes, setAvailablePincodes] = useState([])
  const [deliveryLocation, setdeliveryLocation] = useState("")
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const getAllPincodes = async () => {
      const response = await getRequest(
        "/shipping/pickupLocations",
        props.token
      )
      if (response.status === 200) {
        setAvailablePincodes(response.data.data.shipping_address)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Something went wrong!",
            type: "error",
          },
        })
      }
    }

    getAllPincodes()
  }, [dispatch, props.token])

  const checkCourierServiceability = async () => {
    if (deliveryLocation === undefined) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          type: "info",
          open: true,
          msg: "Please select your pickup location!",
        },
      })
    } else {
      setloading(true)
      const formdata = {
        pickup_postcode: orderData.shippingAddress.pinCode,
        delivery_postcode: delivery_pincode,
        cod: "Prepaid",
        weight: packageWeight,
        orderValue: orderData.totalPrice,
        length,
        width,
        height,
        is_return: 1,
      }

      const response = await request(
        "/shipping/courier/serviceability",
        formdata,
        props.token
      )
      if (response.status === 200) {
        setavailableCouriers(response.data.data.available_courier_companies)
        setshowCouriers(true)
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: `${response.data}`,
            type: "error",
          },
        })
        setloading(false)
      }
    }
  }

  const handleCourierSelection = async (courier, id, name) => {
    setselectedCourierName(name)
    setselectedCourierId(id)
  }

  const handleShippingOnClickEvent = async () => {
    const data = {
      courierId: selectedCourierId,
      orderId: orderData._id,
      weight: packageWeight,
      height: height,
      breadth: width,
      length: length,
      shippingAddress: deliveryLocation,
    }

    const response = await request("/shipping/rto", data, props.token)
    if (response.status === 200) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "Shipment created!",
          type: "success",
        },
      })
      props.history.push("/shipments")
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: `${response.data}`,
          type: "error",
        },
      })
    }
  }

  const handleChange = (event) => {
    setdelivery_pincode(event.target.value.pin_code)
    setdeliveryLocation(event.target.value.associated_rto_address)
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={() => props.setopen(false)}
      TransitionComponent={Transition}>
      <AppBar position="fixed" className={classes.appBar}>
        <AppBarContent />
      </AppBar>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Shipping Info
          </Typography>
          <div className={classes.div}>
            <TextField
              name="pickupPincode"
              id="outlined-basic"
              label="Pickup From"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              disabled
              spellCheck="false"
              value={orderData.shippingAddress.pinCode}
            />
            <FormControl
              variant="outlined"
              style={{ minWidth: "200px" }}
              className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Deliver To</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Deliver To"
                id="demo-simple-select"
                value={delivery_pincode}
                onChange={handleChange}>
                {avilablePincodes.map((availablePincode, index) => (
                  <MenuItem value={availablePincode} key={index}>
                    {availablePincode.pin_code}, {availablePincode.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="orderValue"
              id="outlined-basic"
              label="Order Value"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              spellCheck="false"
              value={orderData.totalPrice}
              disabled
            />
            <TextField
              name="paymentMethod"
              id="outlined-basic"
              label="Payment Method"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              spellCheck="false"
              value="Prepaid"
              disabled
            />
          </div>
          <div className={classes.div}>
            <TextField
              name="height"
              id="outlined-basic"
              label="Height(cm)"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              spellCheck="false"
              onChange={(event) => setheight(event.target.value)}
              required
            />
            <TextField
              name="width"
              id="outlined-basic"
              label="Width(cm)"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              spellCheck="false"
              onChange={(event) => setwidth(event.target.value)}
              required
            />
            <TextField
              name="length"
              id="outlined-basic"
              label="Length(cm)"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              spellCheck="false"
              onChange={(event) => setlength(event.target.value)}
              required
            />
            <TextField
              name="packageWeight"
              id="outlined-basic"
              label="Weight(kg)"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              spellCheck="false"
              value={packageWeight}
              onChange={(event) => setpackageWeight(event.target.value)}
              required
            />
          </div>
          <center>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={checkCourierServiceability}
              style={{ margin: "1rem" }}>
              Check Courier Serviciability
            </Button>
          </center>
          <center>
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              onClick={() => props.setopen(false)}
              style={{ margin: "12px" }}>
              Close
            </Button>
          </center>
        </CardContent>
      </Card>
      {loading ? (
        <div
          style={{
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularIndeterminate />
        </div>
      ) : (
        <div>
          {showCouriers ? (
            <div className={classes.parentBox}>
              <Typography
                variant="h6"
                style={{ textAlign: "center" }}
                gutterBottom>
                Available Couriers
              </Typography>
              {availableCouriers.map((item) => (
                <div
                  className={classes.childBox}
                  key={item.courier_company_id}
                  onClick={() =>
                    handleCourierSelection(
                      item,
                      item.courier_company_id,
                      item.courier_name
                    )
                  }>
                  <Checkbox
                    onChange={() =>
                      handleCourierSelection(
                        item,
                        item.courier_company_id,
                        item.courier_name
                      )
                    }
                    checked={
                      selectedCourierId === item.courier_company_id
                        ? true
                        : false
                    }
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <div style={{ width: "25%", padding: "0 1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <Typography variant="h6" width="25%">
                        {item.courier_name}
                      </Typography>
                      <LocalShippingOutlinedIcon />
                    </div>
                    <p>Min. Weight: {item.min_weight}Kg</p>
                    <div
                      style={{
                        borderRadius: "5px",
                        padding: "2px 1px",
                        backgroundColor: "#F6F6F6",
                      }}>
                      <p
                        style={{
                          color: "grey",
                          fontWeight: "600",
                          textAlign: "center",
                        }}>
                        RTO Charges: {item.rto_charges}
                      </p>
                    </div>
                  </div>
                  <div style={{ width: "55%", padding: "0 1rem" }}>
                    <div className={classes.performance_rating_container}>
                      <div
                        className={
                          classes.performance_rating_container__childDiv
                        }>
                        <CircularProgressWithLabel
                          value={item.pickup_performance.toFixed(1)}
                        />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            display: "block",
                            textAlign: "center",
                          }}>
                          Pickup <br /> Performance
                        </p>
                      </div>
                      <div
                        className={
                          classes.performance_rating_container__childDiv
                        }>
                        <CircularProgressWithLabel
                          value={item.delivery_performance.toFixed(1)}
                        />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            display: "block",
                            textAlign: "center",
                          }}>
                          Delivery <br />
                          Performance
                        </p>
                      </div>
                      <div
                        className={
                          classes.performance_rating_container__childDiv
                        }>
                        <CircularProgressWithLabel
                          value={item.tracking_performance.toFixed(1)}
                        />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            display: "block",
                            textAlign: "center",
                          }}>
                          NDR <br />
                          Performance
                        </p>
                      </div>
                      <div
                        className={
                          classes.performance_rating_container__childDiv
                        }>
                        <CircularProgressWithLabel
                          value={item.rto_performance.toFixed(1)}
                        />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            display: "block",
                            textAlign: "center",
                          }}>
                          RTO <br />
                          Performance
                        </p>
                      </div>
                      <div
                        className={
                          classes.performance_rating_container__childDiv
                        }>
                        <CircularProgressWithLabel
                          value={item.weight_cases.toFixed(1)}
                        />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            display: "block",
                            textAlign: "center",
                          }}>
                          Weight <br />
                          Cases
                        </p>
                      </div>
                      <div
                        className={
                          classes.performance_rating_container__childDiv
                        }>
                        <CircularProgressWithLabel
                          value={item.rating.toFixed(1)}
                        />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            display: "block",
                            textAlign: "center",
                          }}>
                          Overall <br />
                          Rating
                        </p>
                      </div>
                    </div>
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CallRoundedIcon fontSize="small" />
                        <p style={{ fontSize: "0.85rem" }}>
                          Call Before Delivery: {item.call_before_delivery}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <PermContactCalendarRoundedIcon fontSize="small" />
                        <p style={{ fontSize: "0.85rem" }}>
                          POD: {item.pod_available}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <PersonRoundedIcon fontSize="small" />
                        <p style={{ fontSize: "0.85rem" }}>
                          Delivery Boy Number: {item.delivery_boy_contact}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LocationOnRoundedIcon fontSize="small" />
                        <p style={{ fontSize: "0.85rem" }}>
                          Tracking Service: {item.realtime_tracking}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexFlow: "column wrap",
                      padding: "1rem",
                      width: "10%",
                      backgroundColor: "#F6F6F6",
                    }}>
                    <Typography variant="h6">&#8377; {item.rate}</Typography>
                    <div>
                      <p style={{ color: "grey" }}>
                        Freight Charges: {item.freight_charge}
                      </p>
                      <p style={{ color: "grey" }}>
                        + COD Charges: {item.cod_charges}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: "green", fontWeight: "600" }}>
                        Expected Pickup: {item.suppress_date}
                      </p>
                      <p style={{ fontWeight: "600" }}>
                        Expected Delivery: {item.etd}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "white",
                  width: "100%",
                  height: "60px",
                  borderTop: "5px solid #EEEEEE",
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShippingOnClickEvent}
                  style={{
                    borderRadius: "16px",
                    padding: "5px 15px",
                    width: "fit-content",
                  }}>
                  Ship with {selectedCourierName}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Dialog>
  )
}

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        size={50}
        value={normalise(props.value)}
        thickness={4}
        color="primary"
        disableShrink={true}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <p style={{ fontWeight: "bold", fontSize: "0.85" }}>{props.value}</p>
      </Box>
    </Box>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const normalise = (value) => (value / 5) * 100

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(GeneratePickup))
