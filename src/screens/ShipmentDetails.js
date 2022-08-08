import { makeStyles, Typography, Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import request from "../axios/get"
import CircularIndeterminate from "../components/common/Spinner"
import CourierInfo from "../components/Shipment/CourierInfo"
import TrackingInfo from "../components/Shipment/TrackingInfo"
import CustomerInfo from "../components/Shipment/CustomerInfo"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import PaymentInfo from "../components/Shipment/PaymentInfo"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "90px",
    display: "flex",
    justifyContent: "center",
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
  order_details_container: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftContainer: {
    width: "60%",
  },
  rightContainer: {
    width: "30%",
  },
})

const ShipmentDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState()
  const classes = useStyles()

  useEffect(() => {
    const getShipmentDetails = async () => {
      const response = await request(`/shipments/${id}`, token)
      if (response.status === 200) {
        setdata(response.data.shipment)
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Shipment Details could not be fetched!",
            type: "error",
          },
        })
      }
    }
    getShipmentDetails()
  }, [token, id, dispatch])

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularIndeterminate />
        </div>
      ) : (
        <div className={classes.root}>
          <div className={classes.page_content}>
            <div className={classes.header}>
              <div>
                <Typography variant="h5" gutterBottom>
                  Shipment Details
                </Typography>
                <p>Id: #{data.awb_code}</p>
              </div>
              <div>
                <Link
                  to={`/order/${data.order_id_lapcare.orderId}`}
                  style={{ textDecoration: "none" }}>
                  <Button disableElevation variant="outlined" color="primary">
                    View Order
                  </Button>
                </Link>
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "7px" }}>
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href={`https://app.shiprocket.in/order/${data.order_id_shiprocket}`}>
                    View Shiprocket Order
                  </a>
                </Button>
              </div>
            </div>
            <div className={classes.order_details_container}>
              <div className={classes.leftContainer}>
                <CourierInfo data={data} />
                <TrackingInfo data={data} />
              </div>
              <div className={classes.rightContainer}>
                <CustomerInfo data={data} />
                <PaymentInfo data={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShipmentDetails
