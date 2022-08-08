import React from "react"
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  pricingCard: {
    padding: "5px 15px",
  },
  inputField: {
    margin: "10px 0px",
  },
  inputLabel: {
    marginBottom: "4px",
  },
}))

const PricingCard = () => {
  const classes = useStyles()

  return (
    <Card className={classes.pricingCard}>
      <CardContent>
        <Typography style={{ marginBottom: "15px" }} variant="h6">
          Cart Value
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3} className={classes.inputField}>
            <TextField
              id="totalPrice"
              label="Total Price"
              variant="outlined"
              // value={totalPrice}
              // onChange={(event) => {
              // }}
            />
          </Grid>
          <Grid item xs={3} className={classes.inputField}>
            <TextField
              id="tax"
              label="Tax"
              variant="outlined"
              // value={tax}
              // onChange={(event) => {
              // }}
            />
          </Grid>
          <Grid item xs={3} className={classes.inputField}>
            <TextField
              id="discount"
              label="Discount"
              variant="outlined"
              // value={discount}
              // onChange={(event) => {
              // }}
            />
          </Grid>

          <Grid item xs={3} className={classes.inputField}>
            <TextField
              id="shipping"
              label="Shipping"
              variant="outlined"
              // value={shipping}
              // onChange={(event) => {
              // }}
            />
          </Grid>
          <Grid container item xs={12} alignItems="center">
            <Grid item xs={2} className={classes.inputField}>
              <Typography variant="h6">Grand Total</Typography>
            </Grid>
            <Grid item xs={3} className={classes.inputField}>
              <TextField id="grandTotal" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PricingCard
