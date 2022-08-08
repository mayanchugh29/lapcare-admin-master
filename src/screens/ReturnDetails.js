import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

import CustomerCard from "../components/Order/Customer"
import ProductCard from "../components/Order/Products"
import CircularIndeterminate from "../components/common/Spinner"
import request from "../axios/get"
import { connect, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import ReturnAction from "../components/Return/ReturnAction"
import GeneratePickup from "../components/Return/GeneratePickup"
import PickupCard from "../components/Return/Pickup"
import CancelOrderAlert from "../components/Order/CancelOrderAlert"

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

const ReturnDetails = (props) => {
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState()
  const classes = useStyles()
  const [returnStatus, setReturnStatus] = useState()
  const { id } = useParams()
  const [openCancelOrderAlert, setopenCancelOrderAlert] = useState(false)
  const [orderAction, setorderAction] = useState()
  const [openShipmentScreen, setopenShipmentScreen] = useState(false)

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await request(`/returns/${id}`, props.token)
      if (response.status === 200) {
        setdata(response.data.returnOrder)
        setReturnStatus(response.data.returnOrder.returnStatus)

        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Return Details could not be fetched!",
            type: "error",
          },
        })
      }
    }
    getOrderDetails()
  }, [props.token, id, dispatch])

  if (data) {
    data.shippingAddress = data.order.shippingAddress
    data.billingAddress = data.order.billingAddress
  }

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
        <div>
          <GeneratePickup
            open={openShipmentScreen}
            setopen={setopenShipmentScreen}
            data={data}
          />
          <div className={classes.root}>
            <div className={classes.page_content}>
              <div className={classes.header}>
                <div>
                  <Typography variant="h5" gutterBottom>
                    Return Details
                  </Typography>
                  <p>Id: #{data.order.orderId}</p>
                  <p>
                    Date:{" "}
                    {new Date(data.date).toLocaleString("en-GB", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                </div>
                <div>
                  <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setopenCancelOrderAlert(true)
                      setorderAction(2)
                    }}>
                    Refund (Prepaid)
                  </Button>
                </div>
              </div>
              <div className={classes.order_details_container}>
                <div className={classes.leftContainer}>
                  <ProductCard data={data} />
                  <PickupCard
                    data={data}
                    setopen={setopenShipmentScreen}
                    currentOrderStatus={returnStatus}
                    setcurrentOrderStatus={setReturnStatus}
                  />
                </div>
                <div className={classes.rightContainer}>
                  <ReturnAction
                    data={data}
                    currentOrderStatus={returnStatus}
                    setcurrentOrderStatus={setReturnStatus}
                  />
                  <CustomerCard data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openCancelOrderAlert ? (
        <CancelOrderAlert
          open={openCancelOrderAlert}
          setOpen={setopenCancelOrderAlert}
          data={data}
          action={orderAction}
          currentOrderStatus={returnStatus}
          setcurrentOrderStatus={setReturnStatus}
        />
      ) : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(ReturnDetails)
