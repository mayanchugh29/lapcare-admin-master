import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core"

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

const Avaibility = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Product Status
          </Typography>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.textfield}>
            <InputLabel id="demo-simple-select-outlined-label">
              Avaibility
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.value}
              onChange={(event) =>
                props.setFieldValue("avaibility", event.target.value)
              }
              label="Avaiblity">
              <MenuItem value={1}>True</MenuItem>
              <MenuItem value={0}>False</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  )
}

export default Avaibility
