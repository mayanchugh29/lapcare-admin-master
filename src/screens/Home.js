import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import OrdersChart from "../components/Home/OrdersChart"
import RevenueChart from "../components/Home/RevenueChart"
import UsersChart from "../components/Home/UsersChart"
import RecentOrdersBar from "../components/Home/RecentOrdersGraph"
import RecentOrdersTable from "../components/Home/RecentOrdersTable"
import PaymentsChart from "../components/Home/PaymentsChart"

import request from "../axios/get"
import { connect, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "90px",
    padding: "10px",
  },
  page_content: {
    width: "90%",
    margin: "auto",
  },
}))

const Home = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  const [revenue, setrevenue] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await request("/orders/dashboard", props.token)
      if (response.status === 200) {
        setrevenue(response.data.revenue)
        setOrders(response.data.recentOrders)
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
    getAllOrders()
  }, [props.token, dispatch])

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await request("/clients/dashboard", props.token)
      if (response.status === 200) {
        setUsers(response.data.users)
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
    getAllUsers()
  }, [props.token, dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <Grid style={{ cursor: "default" }} container spacing={2}>
          <Grid item xs={4}>
            <OrdersChart orders={revenue} />
          </Grid>
          <Grid item xs={4}>
            <RevenueChart revenue={revenue} />
          </Grid>
          <Grid xs={4}>
            <UsersChart users={users} />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ marginTop: "10px" }}>
          <Grid item xs={6}>
            <RecentOrdersBar orders={revenue} />
          </Grid>
          <Grid item xs={6}>
            <PaymentsChart orders={revenue} />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ marginTop: "24px" }}>
          <RecentOrdersTable orders={orders} />
        </Grid>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(Home))
