import React, { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const MinRequirementsCard = (props) => {
  const classes = useStyles()
  const [minPurchase, setMinPurchase] = useState(false)
  const [minQuantity, setMinQuantity] = useState(false)

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>
          Minimum Requirements
        </Typography>
        <FormControl>
          <RadioGroup>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="None"
              onChange={() => {
                setMinPurchase(false)
                setMinQuantity(false)
              }}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Minimum purchase amount"
              onChange={() => {
                setMinPurchase(true)
                setMinQuantity(false)
              }}
            />
            {minPurchase ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "20px",
                }}>
                <TextField
                  label="Enter amount"
                  variant="outlined"
                  value={props.minAmount}
                  onChange={(e) => props.setminAmount(e.target.value)}
                />
              </div>
            ) : null}

            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Minimum purchase quantity"
              onChange={() => {
                setMinQuantity(true)
                setMinPurchase(false)
              }}
            />
            {minQuantity ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "20px",
                }}>
                <TextField
                  label="Enter quantity"
                  variant="outlined"
                  value={props.minQuantity}
                  onChange={(e) => props.setminQuantity(e.target.value)}
                />
              </div>
            ) : null}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default MinRequirementsCard
