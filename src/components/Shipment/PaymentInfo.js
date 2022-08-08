import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"

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

const PaymentInfo = (props) => {
  const classes = useStyles()
  const data = props.data

  return (
    <Card className={classes.root}>
      <div className={classes.div}>
        <Typography variant="subtitle1" gutterBottom>
          Payment
        </Typography>
        <div className={classes.flexDiv}>
          <p>Payment Method:</p>
          <p>{data.order_id_lapcare.paymentMethod}</p>
        </div>
        {data.order_id_lapcare.paymentMethod === "Prepaid" ? (
          <div className={classes.flexDiv}>
            <p>Payment Id:</p>
            <p>{data.order_id_lapcare.razorpayPaymentId}</p>
          </div>
        ) : null}
        <div className={classes.flexDiv}>
          <p>Shipment Value:</p>
          <p>{data.order_id_lapcare.totalPrice}</p>
        </div>
      </div>
    </Card>
  )
}

export default PaymentInfo
