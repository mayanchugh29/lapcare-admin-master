import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { Checkbox, Divider, Grid } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
})

const Shipping = (props) => {
  const [showShippingFields, setshowShippingFields] = useState(
    props.showShippingDetails
  )
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Shipping
          </Typography>
          <Checkbox
            checked={showShippingFields}
            style={{ display: "inline-block" }}
            onChange={() => setshowShippingFields(!showShippingFields)}
          />{" "}
          <p style={{ display: "inline-block" }}>This ia a physical Product</p>
          {showShippingFields ? (
            <div>
              <Divider className={classes.textfield} />
              <Typography variant="body1">Product Dimensions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="productDimension.length"
                    type="number"
                    label="Length"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.productDimension.length}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="productDimension.width"
                    type="number"
                    label="Width"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.productDimension.width}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    name="productDimension.height"
                    label="Height"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.productDimension.height}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="productDimension.unit"
                    label="Unit"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.productDimension.unit}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.textfield} />
              <Typography variant="body1">Package Dimensions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="packageDimension.length"
                    type="number"
                    label="Length"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.packageDimension.length}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="packageDimension.width"
                    type="number"
                    id="packageWidth"
                    label="Width"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.packageDimension.width}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    name="packageDimension.height"
                    label="Height"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.packageDimension.height}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="packageDimension.unit"
                    label="Unit"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.packageDimension.unit}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.textfield} />
              <Typography variant="body1">Product Weight</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="productWeight.value"
                    type="number"
                    label="Weight"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.productWeight.value}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="productWeight.unit"
                    label="Unit"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.productWeight.unit}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.textfield} />
              <Typography variant="body1">Package Weight</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="packageWeight.value"
                    type="number"
                    id="packageWeight"
                    label="Weight"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.packageWeight.value}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="packageWeight.unit"
                    label="Unit"
                    autoComplete="off"
                    variant="outlined"
                    className={classes.textfield}
                    onChange={props.onChange}
                    value={props.values.packageWeight.unit}
                  />
                </Grid>
              </Grid>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default Shipping
