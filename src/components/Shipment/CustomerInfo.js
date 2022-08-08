import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem"
  },
  div: {
    padding: "1rem",
    borderBottom: "0.8px solid silver"
  },
  title: {
    fontSize: 14,
    marginBottom: 12
  },
  pos: {
    marginBottom: 12
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14
  },
  flexDiv: {
    display: "flex",
    justifyContent: "space-between"
  }
})

const CutomerInfo = (props) => {
  const classes = useStyles()
  const customerInfo = props.data.order_id_lapcare

  return (
    <Card className={classes.root}>
      <div className={classes.div}>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" gutterBottom>
            Shipping Address
          </Typography>
        </div>
        <p>{customerInfo.shippingAddress.fullName}</p>
        <p>
          {customerInfo.shippingAddress.addressLine1 +
            ", " +
            customerInfo.shippingAddress.addressLine2 +
            ", "}
          {customerInfo.shippingAddress.landmark}
          <br />
          {customerInfo.shippingAddress.city +
            ", " +
            customerInfo.shippingAddress.state}
          <br />
          {customerInfo.shippingAddress.pinCode}
          <br />
          {customerInfo.shippingAddress.phoneNumber}
        </p>
      </div>
      <div className={classes.div}>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" gutterBottom>
            Billing Address
          </Typography>
        </div>
        <p>{customerInfo.billingAddress.fullName}</p>
        <p>
          {customerInfo.billingAddress.addressLine1 +
            ", " +
            customerInfo.billingAddress.addressLine2 +
            ", "}
          {customerInfo.billingAddress.landmark}
          <br />
          {customerInfo.billingAddress.city +
            ", " +
            customerInfo.billingAddress.state}
          <br />
          {customerInfo.billingAddress.pinCode}
          <br />
          {customerInfo.billingAddress.phoneNumber}
        </p>
      </div>
    </Card>
  )
}

export default CutomerInfo
