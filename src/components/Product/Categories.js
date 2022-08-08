import React, { useState, useEffect } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
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

const Categories = (props) => {
  const classes = useStyles()
  const [value, setvalue] = useState(props.category ? props.category.name : "")
  useEffect(() => {
    props.categories.map((category) =>
      category._id === props.value ? setvalue(category.name) : null
    )
  }, [props.categories,props.value])
  const handleChange = (event) => {
    let returnedObject
    props.categories.map((category) =>
      category.name === event.target.value ? (returnedObject = category) : null
    )
    props.setselectedCategory(returnedObject)
    props.setFieldValue("category", returnedObject._id)
    setvalue(event.target.value)
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Category
          </Typography>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.textfield}>
            <InputLabel id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={value}
              onChange={(event) => handleChange(event)}
              label="Category">
              {props.categories.map((category) => (
                <MenuItem value={category.name} key={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  )
}

export default Categories
