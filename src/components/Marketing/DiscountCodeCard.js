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

const DiscountCodeCard = (props) => {
  const classes = useStyles()
  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>Discount Code</Typography>
        <TextField
          name="code"
          value={props.code}
          onChange={(e) => props.setcode(e.target.value)}
          label="Discount Code"
          variant="outlined"
          fullWidth
        />
      </CardContent>
    </Card>
  )
}

export default DiscountCodeCard
