import React from "react"
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core"
import Customer from "./Customer"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const CustomerEligibilityCard = (props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>
          Customer Eligibility
        </Typography>
        <FormControl>
          <RadioGroup>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Everyone"
              onChange={() => {
                props.setisUserSpecific(false)
              }}
            />

            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Specific customers"
              onChange={() => {
                props.setisUserSpecific(true)
              }}
            />
          </RadioGroup>
        </FormControl>
        {props.isUserSpecific ? (
          <Customer users={props.users} setusers={props.setusers} />
        ) : null}
      </CardContent>
    </Card>
  )
}

export default CustomerEligibilityCard
