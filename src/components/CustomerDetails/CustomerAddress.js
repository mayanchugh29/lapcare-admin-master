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
  }
})

const CutomerAddress = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.div}>
        <Typography variant="subtitle1" style={{fontWeight:"600"}} >
          Customer
        </Typography>
        <p>{props.data.fname + " " + props.data.lname}</p>
      </div>
      <div className={classes.div}>
        <div className={classes.flexDiv}>
          <Typography variant="subtitle1" style={{fontWeight:"600"}}>
            Contact Information
          </Typography>
        </div>
        <p>{props.data.email}</p>
        <p>{props.data.contact}</p>
      </div>
      <div className={classes.div}>
        <Typography variant="subtitle1" style={{fontWeight:"600"}}>
          Default Address
        </Typography>
        {props.data.savedAddresses.length > 0 ? (
          <div>
            <p>{props.data.savedAddresses[0].fullName}</p>
            <p>
              {props.data.savedAddresses[0].addressLine1 +
                ", " +
                props.data.savedAddresses[0].addressLine2 +
                ", "}
              {props.data.savedAddresses[0].landmark}
              <br />
              {props.data.savedAddresses[0].city +
                ", " +
                props.data.savedAddresses[0].state}
              <br />
              {props.data.savedAddresses[0].pinCode}
              <br />
              {props.data.savedAddresses[0].phoneNumber}
            </p>
          </div>
        ) : (
          <p style={{ color: "grey" }}>No saved addresses</p>
        )}
      </div>
    </Card>
  )
}

export default CutomerAddress
