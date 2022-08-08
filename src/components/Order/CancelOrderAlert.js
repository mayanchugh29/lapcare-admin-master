import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import request from "../../axios/delete"
import getRequest from "../../axios/get"
import putRequest from "../../axios/put"
import { useDispatch, useSelector } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CancelOrderAlert(props) {
  const token = useSelector((state) => state.authReducer.token)
  const dispatch = useDispatch()

  const cancelAndRefundOrderHandler = async () => {
    if (props.data.orderStatus.some((e) => e.status === "Order Cancelled")) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          type: "error",
          msg: "Order is cancelled already!",
        },
      })
    } else {
      const response = await request(`/order/${props.data._id}`, token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            type: "success",
            msg: "Order cancelled & refund is generated!",
          },
        })
        props.setcurrentOrderStatus((prev) => [
          ...prev,
          { status: "Order Cancelled" },
        ])
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            type: "error",
            msg: "Order could not be cancelled!",
          },
        })
      }
    }

    props.setOpen(false)
  }

  const refundOrderHandler = async () => {
    const response = await getRequest("/refund/create", token, {
      orderId: props.data._id,
    })
    if (response.status === 200) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          type: "success",
          msg: "Refund initiated!",
        },
      })
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          type: "error",
          msg: "Refund could not be initiated!",
        },
      })
    }
    props.setOpen(false)
  }

  const cancelOrderHandler = async () => {
    if (props.data.orderStatus.some((e) => e.status === "Order Cancelled")) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          type: "error",
          msg: "Order is cancelled already!",
        },
      })
    } else {
      const data = {
        orders: [props.data.orderId],
        statusId: 3,
      }
      const response = await putRequest("/orders/bulkUpdate", data, token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Order Cancelled",
            type: "success",
          },
        })
        props.setcurrentOrderStatus((prev) => [
          ...prev,
          { status: "Order Cancelled" },
        ])
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Something went wrong",
            type: "error",
          },
        })
      }
    }
    props.setOpen(false)
  }

  const handleConfirm = () => {
    if (props.action === 1) {
      cancelAndRefundOrderHandler()
    } else if (props.action === 2) {
      refundOrderHandler()
    } else {
      cancelOrderHandler()
    }
  }

  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogTitle id="alert-dialog-slide-title">
        Are you sure you want to {props.action === 1 ? "cancel" : "refund"} this
        Order?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.action !== 2
            ? `The Order: ${props.data.orderId} will be cancelled ${
                props.action !== 3
                  ? `and the refund will be generated automatically to ${props.data.userId.fname}`
                  : `for ${props.data.userId.fname}`
              }`
            : `The Payment amount for the Order: ${props.data.orderId} will be refunded to ${props.data.userId.fname}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
