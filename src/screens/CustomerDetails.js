import { makeStyles, Typography } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import request from "../axios/get"
import CircularIndeterminate from "../components/common/Spinner"
import Cart from "../components/CustomerDetails/Cart"
import Customer from "../components/CustomerDetails/Customer"
import CutomerAddress from "../components/CustomerDetails/CustomerAddress"
import Orders from "../components/CustomerDetails/Orders"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

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
  client_details_container: {
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

const CustomerDetails = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState()
  const { id } = useParams()
  const token = useSelector((state) => state.authReducer.token)

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await request(`/clients/${id}`, token)
      if (response.status === 200) {
        setdata(response.data.client)
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            open: true,
            msg: "Something went wrong!",
          },
        })
      }
    }
    fetchCustomer()
  }, [dispatch, id, token])
  return (
    <div className={classes.root}>
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
        <div className={classes.page_content}>
          <div className={classes.header}>
            <div>
              <Typography variant="h5" gutterBottom>
                Client Details
              </Typography>
              <p>Id: #{data._id}</p>
            </div>
          </div>
          <div className={classes.client_details_container}>
            <div className={classes.leftContainer}>
              <Customer data={data} />
              <Orders orders={data.orders} />
              <Cart data={data.cartValue} />
            </div>
            <div className={classes.rightContainer}>
              <CutomerAddress data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDetails
