import React, { useState } from "react"
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    padding: " 5px 15px",
  },
  cardTitle: {
    marginBottom: "10px",
  },
  inputLabel: {
    marginBottom: "4px",
  },
})

const ShippingCard = (props) => {
  const classes = useStyles()
  console.log(props.values)
  const [showBillingAddress, setshowBillingAddress] = useState(false)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.cardTitle}>
          Shipping Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.inputField}>
            <Typography className={classes.inputLabel}>Full Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.fullName"
              value={props.values.shippingAddress.fullName}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.inputField}>
            <Typography className={classes.inputLabel}>
              Address Line 1
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.addressLine1"
              value={props.values.shippingAddress.addressLine1}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.inputField}>
            <Typography className={classes.inputLabel}>
              Address Line 2
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.addressLine2"
              value={props.values.shippingAddress.addressLine2}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.inputField}>
            <Typography className={classes.inputLabel}>LandMark</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.landmark"
              value={props.values.shippingAddress.landmark}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <Typography className={classes.inputLabel}>City</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.city"
              value={props.values.shippingAddress.city}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <Typography className={classes.inputLabel}>State</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.state"
              value={props.values.shippingAddress.state}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <Typography className={classes.inputLabel}>Pin Code</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.pinCode"
              value={props.values.shippingAddress.pinCode}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.inputField}>
            <Typography className={classes.inputLabel}>Phone Number</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="shippingAddress.phoneNumber"
              value={props.values.shippingAddress.phoneNumber}
              onChange={props.handleChange}
            />
          </Grid>
        </Grid>
        <div>
          <FormControlLabel
            checked={!showBillingAddress}
            style={{ margin: "14px 0" }}
            control={
              <Checkbox
                checked={!showBillingAddress}
                onClick={() => setshowBillingAddress(!showBillingAddress)}
              />
            }
            label="Billing Address Same as Shipping Address"
          />
          {showBillingAddress ? (
            <div>
              <Typography variant="h6" className={classes.cardTitle}>
                Billing Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>
                    Full Name
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>
                    Address Line 1
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>
                    Address Line 2
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>
                    LandMark
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={6} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>City</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={6} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>State</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={6} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>
                    Pin Code
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xs={6} className={classes.inputField}>
                  <Typography className={classes.inputLabel}>
                    Phone Number
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
              </Grid>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingCard
