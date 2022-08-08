import React from "react"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button } from "@material-ui/core"
import { withRouter } from "react-router-dom"

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
    textAlign: "center",
  },
})

const CourierInfoCard = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">Courier Info</Typography>
        <div className={classes.div}>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Courier Name:</p>
            <p>{props.data.courier_name}</p>
          </div>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Awb Code:</p>
            <p>{props.data.awb_code}</p>
          </div>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Pickup Date:</p>
            <p>{props.data.pickup_scheduled_date}</p>
          </div>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Assigned Date:</p>
            <p>{props.data.assigned_date_time}</p>
          </div>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Pickup Token:</p>
            <p>{props.data.pickup_token_number}</p>
          </div>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Shipment Id:</p>
            <p>{props.data.shipment_id}</p>
          </div>
          <div
            style={{
              margin: "0.5rem 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <p>Shiprocket Order Id:</p>
            <p>{props.data.order_id_shiprocket}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="primary" variant="outlined">
              <a
                href={props.data.label_url}
                style={{ textDecoration: "none", color: "inherit" }}>
                Print Label
              </a>
            </Button>
            <Button color="primary" variant="outlined">
              <a
                href={props.data.manifest_url}
                style={{ textDecoration: "none", color: "inherit" }}>
                Print Manifest
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default withRouter(CourierInfoCard)
