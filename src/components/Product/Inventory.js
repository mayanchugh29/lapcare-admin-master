import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import {  Grid, MenuItem, Select } from "@material-ui/core"

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
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
})

const Inventory = (props) => {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Inventory
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="sku"
                id="outlined-basic"
                autoComplete="off"
                label="SKU"
                variant="outlined"
                style={{ display: "inline-block" }}
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.sku}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="modelNumber"
                id="outlined-basic"
                autoComplete="off"
                label="Model No"
                variant="outlined"
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.modelNumber}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="quantity"
                type="number"
                id="outlined-basic"
                autoComplete="off"
                label="Quantity"
                variant="outlined"
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.quantity}
              />
            </Grid>
          </Grid>
          <Typography variant="body1" gutterBottom>
            Product Code
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="productCode.label"
                id="outlined-basic"
                autoComplete="off"
                label="Label"
                variant="outlined"
                style={{ display: "inline-block" }}
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.productCode.label}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="productCode.value"
                id="outlined-basic"
                autoComplete="off"
                label="Value"
                variant="outlined"
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.productCode.value}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                name="origin"
                id="outlined-basic"
                autoComplete="off"
                label="Origin"
                variant="outlined"
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.origin}>
                <MenuItem value={"China"}>China</MenuItem>
                <MenuItem value={"India"}>India</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inventory
