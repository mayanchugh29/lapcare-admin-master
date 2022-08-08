import React from "react"
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  makeStyles,
  Grid,
  TextField,
} from "@material-ui/core"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const ActiveDateCard = (props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>Active Dates</Typography>
        <FormControl fullWidth>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Typography style={{ margin: "8px 0" }} variant="subtitle2">
                Valid From
              </Typography>
              <TextField
                name="validity.start"
                value={props.validity.start}
                onChange={(e) =>
                  props.setvalidity((prev) => ({
                    ...prev,
                    start: e.target.value,
                  }))
                }
                variant="outlined"
                fullWidth
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ margin: "8px 0" }} variant="subtitle2">
                Valid To
              </Typography>
              <TextField
                name="validity.expiry"
                value={props.validity.expiry}
                onChange={(e) =>
                  props.setvalidity((prev) => ({
                    ...prev,
                    expiry: e.target.value,
                  }))
                }
                variant="outlined"
                fullWidth
                type="date"
              />
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default ActiveDateCard
