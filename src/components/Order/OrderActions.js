import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button, FormControl, MenuItem, Select } from "@material-ui/core"
import request from "../../axios/post"
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

const OrderActions = (props) => {
  const classes = useStyles()
  const token = useSelector((state) => state.authReducer.token)
  const [selectedValue, setselectedValue] = useState()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setselectedValue(event.target.value)
  }

  const handleSubmit = async () => {
    const data = {
      type: selectedValue,
      orderId: props.orderId,
    }
    const response = await request("/email/orderStatus", data, token)
    if (response.status === 200) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Action completed!",
          open: true,
          type: "success",
        },
      })
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Something went wrong!",
          open: true,
          type: "error",
        },
      })
    }
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Actions
        </Typography>
        <FormControl fullWidth size="small" className={classes.formControl}>
          <Select
            value={selectedValue}
            label="Order Status"
            onChange={handleChange}
            color="primary"
            variant="outlined">
            <MenuItem value={1}>Resend order confirmation email</MenuItem>
            <MenuItem value={2}>Resend order shipped email</MenuItem>
            <MenuItem value={3}>Resend order delivered email</MenuItem>
            <MenuItem value={4}>Resend order cancellation email</MenuItem>
          </Select>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}>
            Send
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default OrderActions
