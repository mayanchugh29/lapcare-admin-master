import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"
import EditRoundedIcon from "@material-ui/icons/EditRounded"
import EditShipmentModal from "../Order/EditShipmentModal"
import { Link } from "react-router-dom"

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

const PickupCard = (props) => {
  const classes = useStyles()
  const [shippingModal, setshippingModal] = useState(false)
  const [isShipped, setisShipped] = useState(props.data.shipment.is_picked)
  const [shipment, setshipment] = useState(props.data.shipment.id)
  const [editShipmentModal, seteditShipmentModal] = useState(false)
  const dispatch = useDispatch()

  const handleCreateShipment = () => {
    if (
      props.currentOrderStatus[props.currentOrderStatus.length - 1].status !==
      "Return Approved"
    ) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "You have to change the Order status to Return Approved before creating pickup",
          open: true,
          type: "info",
        },
      })
    } else {
      props.setopen(true)
    }
  }

  return (
    <div>
      {isShipped ? (
        <EditShipmentModal
          open={editShipmentModal}
          setopen={seteditShipmentModal}
          shipment={shipment}
          setshipment={setshipment}
        />
      ) : null}
      <Card className={classes.root}>
        <CardContent>
          {isShipped ? null : <Typography variant="h6">Pickup</Typography>}
          <div className={classes.div}>
            {isShipped ? (
              <div>
                <div
                  style={{
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Typography variant="h6" gutterBottom>
                    Pickup info
                  </Typography>
                  <EditRoundedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => seteditShipmentModal(true)}
                  />
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Courier Name:</p>
                  <p>{shipment.courier_name}</p>
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Awb Code:</p>
                  <p>{shipment.awb_code}</p>
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Pickup Date:</p>
                  <p>{shipment.pickup_scheduled_date}</p>
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Assigned Date:</p>
                  <p>{shipment.assigned_date_time}</p>
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Pickup Token:</p>
                  <p>{shipment.pickup_token_number}</p>
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Shipment Id:</p>
                  <p>{shipment.shipment_id}</p>
                </div>
                <div
                  style={{
                    margin: "0.5rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <p>Shiprocket Order Id:</p>
                  <p>{shipment.order_id_shiprocket}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation>
                      <a
                        href={`https://app.shiprocket.in/order/${shipment.order_id_shiprocket}`}
                        style={{ textDecoration: "none", color: "inherit" }}>
                        View Shiprocket Order
                      </a>
                    </Button>
                  </div>
                  <div>
                    <Link
                      to={`/shipments/${shipment._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}>
                      <Button color="primary" variant="outlined">
                        Track
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p>Pickup not generated yet</p>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCreateShipment}>
                  Generate Pickup
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default withRouter(PickupCard)
