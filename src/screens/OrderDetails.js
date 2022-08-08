import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

import NotesCard from "../components/Order/Notes"
import CustomerCard from "../components/Order/Customer"
import ProductCard from "../components/Order/Products"
import PaymentInfoCard from "../components/Order/Payment"
import ShippingCard from "../components/Order/Shipping"
import { withStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemText from "@material-ui/core/ListItemText"
import CreateShipment from "../components/Order/CreateShipment"
import CircularIndeterminate from "../components/common/Spinner"
import NotesSection from "../components/Order/NotesSection"
import request from "../axios/get"
import { connect, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import OrderStatusCard from "../components/Order/OrderStatus"
import OrderActions from "../components/Order/OrderActions"
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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const OrderDetails = (props) => {
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState()
  const classes = useStyles()
  const [open, setopen] = useState(false)
  const [currentOrderStatus, setcurrentOrderStatus] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { id } = useParams()
  const [openCancelOrderAlert, setopenCancelOrderAlert] = useState(false)
  const [orderAction, setorderAction] = useState()

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await request(`/order/${id}`, props.token)
      if (response.status === 200) {
        setdata(response.data.orderDetails)
        setcurrentOrderStatus(response.data.orderDetails.orderStatus)
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Order Details could not be fetched!",
            type: "error",
          },
        })
      }
    }
    getOrderDetails()
  }, [props.token, id, dispatch])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          <CreateShipment open={open} setopen={setopen} data={data} />
          <div className={classes.root}>
            <div className={classes.page_content}>
              <div className={classes.header}>
                <div>
                  <Typography variant="h5" gutterBottom>
                    Order Details
                  </Typography>
                  <p>Id: #{data.orderId}</p>
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
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}>
                    Cancel Order
                  </Button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <StyledMenuItem
                      onClick={() => {
                        setopenCancelOrderAlert(true)
                        setorderAction(1)
                      }}>
                      <ListItemText primary="Cancel Order & Refund (Update order status to cancelled and issue refund for prepaid)" />
                    </StyledMenuItem>
                    <StyledMenuItem
                      onClick={() => {
                        setopenCancelOrderAlert(true)
                        setorderAction(2)
                      }}>
                      <ListItemText primary="Refund Full Amount (For Prepaid Return Orders)" />
                    </StyledMenuItem>
                    <StyledMenuItem
                      onClick={() => {
                        setopenCancelOrderAlert(true)
                        setorderAction(3)
                      }}>
                      <ListItemText primary="Cancel Order (Update order status to cancelled)" />
                    </StyledMenuItem>
                  </StyledMenu>
                </div>
              </div>
              <div className={classes.order_details_container}>
                <div className={classes.leftContainer}>
                  <ProductCard data={data} />
                  <PaymentInfoCard data={data} />
                  <ShippingCard
                    data={data}
                    setopen={setopen}
                    currentOrderStatus={currentOrderStatus}
                    setcurrentOrderStatus={setcurrentOrderStatus}
                  />
                  <NotesSection notes={data.notes} />
                </div>
                <div className={classes.rightContainer}>
                  <OrderStatusCard
                    data={data}
                    currentOrderStatus={currentOrderStatus}
                    setcurrentOrderStatus={setcurrentOrderStatus}
                  />
                  <OrderActions orderId={data._id} />
                  <CustomerCard data={data} />
                  <NotesCard orderId={data._id} />
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
          currentOrderStatus={currentOrderStatus}
          setcurrentOrderStatus={setcurrentOrderStatus}
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

export default connect(mapStateToProps)(OrderDetails)
