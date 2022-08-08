import React, { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  makeStyles,
  Checkbox,
  TextField,
} from "@material-ui/core"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const UsageLimitCard = (props) => {
  const classes = useStyles()
  const [enterCouponLimits, setenterCouponLimits] = useState(false)

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>Usage Limits</Typography>
        <FormControl>
          <FormControlLabel
            value="1"
            control={
              <Checkbox
                checked={enterCouponLimits}
                onChange={(e) => setenterCouponLimits(e.target.checked)}
              />
            }
            label="Limit number of times this discount can be used in total"
          />
          {enterCouponLimits ? (
            <TextField
              color="primary"
              variant="outlined"
              value={props.limits}
              onChange={(e) => props.setlimits(e.target.value)}
            />
          ) : null}
          <FormControlLabel
            value={props.limitToOneUser}
            control={
              <Checkbox
                checked={props.limitToOneUser}
                onChange={(e) => {
                  props.setlimitToOneUser(e.target.checked)
                }}
              />
            }
            label="Limit to one use per customer"
          />
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default UsageLimitCard
