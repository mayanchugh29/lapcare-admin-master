import React from "react"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const ValueCard = (props) => {
  const classes = useStyles()
  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>Value</Typography>
        <TextField
          name="discountValue"
          value={props.discountValue}
          onChange={(e) => props.setdiscountValue(e.target.value)}
          label="Value"
          variant="outlined"
          fullWidth
        />
      </CardContent>
    </Card>
  )
}

export default ValueCard
