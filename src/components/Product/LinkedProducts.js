import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles({
  card: {
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

const LinkedProduct = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Linked Products
          </Typography>
          <TextField
            id="outlined-basic"
            label="Up Sale"
            autoComplete="off"
            variant="outlined"
            className={classes.textfield}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Cross Sale"
            autoComplete="off"
            variant="outlined"
            className={classes.textfield}
            fullWidth
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default LinkedProduct
