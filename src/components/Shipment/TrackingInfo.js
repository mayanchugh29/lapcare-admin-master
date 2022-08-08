import React from "react"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

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

const TrackingInfo = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">Tracking Info</Typography>
        <div style={{ padding: "1rem 0" }}>
          {props.data.created_manually ? (
            <Typography variant="subtitle1" align="center">
              No tracking info available as the shipment is created manually{" "}
            </Typography>
          ) : (
            <Typography variant="subtitle1" align="center">
              No tracking info available as the shipment is created manually{" "}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default TrackingInfo
