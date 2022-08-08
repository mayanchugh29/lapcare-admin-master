import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import EditShippingAddressModal from "./EditShippingAddressModal"
import { withRouter } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  div: {
    padding: "1rem",
    borderBottom: "0.8px solid silver",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
  flexDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
})

const CutomerCard = (props) => {
  const [openShippingAddressModal, setOpenShippingAddressModal] =
    useState(false)
  const [shippingAddress, setshippingAddress] = useState(
    props.data.shippingAddress
  )
  const classes = useStyles()
  const customerInfo = props.data

  const openShippingAddressModalHandler = () => {
    setOpenShippingAddressModal(true)
  }

  const closeShippingAddressModalHandler = () => {
    setOpenShippingAddressModal(false)
  }

  return (
    <Card className={classes.root}>
      <div className={classes.div}>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" gutterBottom>
            Customer
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() =>
              props.history.push(`/customer/${customerInfo.userId._id}`)
            }>
            View
          </Typography>
        </div>
        <p>{customerInfo.userId.fname + " " + customerInfo.userId.lname}</p>
      </div>
      <div className={classes.div}>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" gutterBottom>
            Contact Information
          </Typography>
        </div>
        <p>{customerInfo.userId.email}</p>
        <p>{shippingAddress.phoneNumber}</p>
      </div>
      <div className={classes.div}>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" gutterBottom>
            Shipping Address
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={openShippingAddressModalHandler}>
            Edit
          </Typography>
          <EditShippingAddressModal
            open={openShippingAddressModal}
            onClose={closeShippingAddressModalHandler}
            data={props.data.shippingAddress}
            orderId={props.data._id}
            setshippingAddress={setshippingAddress}
          />
        </div>
        <p>{shippingAddress.fullName}</p>
        <p>
          {shippingAddress.addressLine1 +
            ", " +
            shippingAddress.addressLine2 +
            ", "}
          {shippingAddress.landmark}
          <br />
          {shippingAddress.city + ", " + shippingAddress.state}
          <br />
          {shippingAddress.pinCode}
          <br />
          {shippingAddress.phoneNumber}
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

export default withRouter(CutomerCard)
