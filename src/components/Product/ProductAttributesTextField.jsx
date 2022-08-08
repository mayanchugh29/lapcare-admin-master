import {
  Grid,
  TextField,
  makeStyles,
  Select,
  MenuItem,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"

const useStyles = makeStyles({
  textfield: {
    display: "inline-block",
    margin: "8px 0",
  },
})

const ProductAttributesTextField = (props) => {
  const classes = useStyles()
  const [functionCalled, setfunctionCalled] = useState(false)
  const [value, setvalue] = useState("")
  const [attributExists, setattributExists] = useState(false)

  useEffect(() => {
    props.prevValues.forEach((prevValue) =>
      prevValue.attribute === props.categoryAttribute._id.toString()
        ? (setvalue(prevValue.value), setattributExists(true))
        : null
    )
  }, [props.prevValues,props.categoryAttribute._id])

  const handleChange = (event) => {
    setvalue(event.target.value)
    if (attributExists) {
      props.prevValues.forEach((prevValue) =>
        prevValue.attribute === props.categoryAttribute._id
          ? (prevValue.value = event.target.value)
          : null
      )
    } else {
      if (functionCalled === false) {
        const object = {
          attribute: props.categoryAttribute._id,
          value: event.target.value,
        }
        props.setattributes([...props.attributes, object])
        setfunctionCalled(true)
      } else {
        props.attributes.forEach((item) => {
          if (item.attribute === props.categoryAttribute._id) {
            item.value = event.target.value
          }
        })
      }
    }
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Attribute"
          value={props.categoryAttribute.name}
          autoComplete="off"
          variant="outlined"
          className={classes.textfield}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          fullWidth
          id="outlined-basic"
          label="Value"
          autoComplete="off"
          className={classes.textfield}
          variant="outlined"
          value={value}
          onChange={(event) => handleChange(event)}>
          {props.categoryAttribute.values.map((value) => (
            <MenuItem value={value} key={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}

export default ProductAttributesTextField
