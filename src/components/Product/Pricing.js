import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { Divider, Grid } from "@material-ui/core"

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

const Pricing = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                type="number"
                name="costPrice"
                label="Cost Price"
                variant="outlined"
                autoComplete="off"
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.costPrice}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                name="sellingPrice"
                type="number"
                label="Selling Price"
                autoComplete="off"
                variant="outlined"
                className={classes.textfield}
                onChange={props.onChange}
                value={props.values.sellingPrice}
              />
            </Grid>
          </Grid>
          <Divider className={classes.textfield} />
          <TextField
            id="outlined-basic"
            type="number"
            name="tax"
            label="Tax"
            variant="outlined"
            autoComplete="off"
            style={{ display: "inline-block" }}
            className={classes.textfield}
            onChange={props.onChange}
            value={props.values.tax}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Pricing
