import React from "react"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Divider } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem",
  },
})

const PaymentInfo = (props) => {
  const data = props.data
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Info
        </Typography>
        <div className={classes.div}>
          <p>Coupon Discount</p>
          <p>{data.couponDiscount}</p>
        </div>
        <div className={classes.div}>
          <p>Shipping</p>
          <p>{data.shippingCharges?data.shippingCharges:0}</p>
        </div>
        <div className={classes.div}>
          <p>Total</p>
          <p>{data.products.length}</p>
          <p style={{ fontWeight: "600" }}>{data.totalPrice}</p>
        </div>
        <Divider />
        <div className={classes.div}>
          <p style={{ fontWeight: "600", fontSize: "1rem" }}>Payment Method</p>
          <p style={{ fontWeight: "600", fontSize: "1rem" }}>
            {data.paymentMethod}{" "}
            {data.paymentMethod === "Prepaid"
              ? `(Payment Id: ${data.razorpayPaymentId})`
              : null}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentInfo
