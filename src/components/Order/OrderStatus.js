import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button, FormControl, MenuItem, Select } from "@material-ui/core"
import request from "../../axios/put"
import { useSelector, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    margin: "10px 0",
  },
  formControl: {
    margin: "14px 0",
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
  cardTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

const OrderStatusCard = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const orderStatusArray = [
    "Order Confirmed",
    "Order Processing",
    "Order Delivered",
    "Refunded",
    "Return Initiated",
    "RTO",
  ]
  const [selectedValue, setselectedValue] = useState("")
  const handleChange = (event) => {
    setselectedValue(event.target.value)
  }

  const getStatusId = () => {
    let statusId
    if (selectedValue === "Order Processing") {
      statusId = 5
    } else if (selectedValue === "Order Confirmed") {
      statusId = 4
    } else if (selectedValue === "Refunded") {
      statusId = 13
    } else if (selectedValue === "Return Initiated") {
      statusId = 9
    } else if (selectedValue === "RTO") {
      statusId = 10
    } else {
      statusId = 7
    }
    return statusId
  }

  const handleSubmit = async () => {
    if (
      selectedValue ===
      props.currentOrderStatus[props.currentOrderStatus.length - 1].status
    ) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Order is already in the selected state",
          open: true,
          type: "info",
        },
      })
    } else {
      if (
        selectedValue === "Order Processing" &&
        props.currentOrderStatus[props.currentOrderStatus.length - 1].status !==
          "Order Confirmed"
      ) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "You have to confirm the order first!",
            open: true,
            type: "info",
          },
        })
      } else if (
        selectedValue === "Order Delivered" &&
        props.currentOrderStatus[props.currentOrderStatus.length - 1].status !==
          "Order Shipped"
      ) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "You have to ship the order first!",
            open: true,
            type: "info",
          },
        })
      } else {
        const statusId = getStatusId()
        const data = {
          status: selectedValue,
          orderId: props.data._id,
          statusId: statusId,
        }
        const response = await request("/order/orderStatus", data, token)
        if (response.status === 200) {
          props.setcurrentOrderStatus((prev) => [
            ...prev,
            { status: selectedValue },
          ])
          dispatch({
            type: SET_TOASTIFY,
            payload: {
              msg: "Order Status Updated!",
              open: true,
              type: "success",
            },
          })
        } else {
          dispatch({
            type: SET_TOASTIFY,
            payload: {
              msg: `${response.data}`,
              open: true,
              type: "error",
            },
          })
        }
      }
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Status
        </Typography>
        {props.currentOrderStatus ? (
          <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
            Current Order Status :{" "}
            {
              props.currentOrderStatus[props.currentOrderStatus.length - 1]
                .status
            }
          </Typography>
        ) : (
          ""
        )}
        <FormControl fullWidth size="small" className={classes.formControl}>
          <Select
            value={selectedValue}
            label="Order Status"
            onChange={handleChange}
            color="primary"
            variant="outlined">
            {orderStatusArray.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}>
            Update
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default OrderStatusCard
