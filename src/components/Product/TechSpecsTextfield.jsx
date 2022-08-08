import { TextField, makeStyles, Grid } from "@material-ui/core"
import React, { useState } from "react"

const useStyles = makeStyles({
  textfield: {
    margin: "8px 0"
  }
})

const TechSpecsTextField = (props) => {
  const classes = useStyles()
  const [key, setkey] = useState(props.edit ? props.spec.key : "")
  const [value, setvalue] = useState(props.edit ? props.spec.value : "")
  const [functionCalled, setfunctionCalled] = useState(false)

  const handleChange = (field, event) => {
    if (field === 1) {
      setkey(event.target.value)
    } else {
      setvalue(event.target.value)
    }

    const object = {
      key,
      value
    }

    if (functionCalled === false) {
      props.settechSpecs((prev) => [...prev, object])
      setfunctionCalled(true)
    } else {
      props.techSpecs.forEach((techSpec, i) => {
        if (i === props.objectId) {
          if (field === 1) {
            techSpec.key = event.target.value
          } else {
            techSpec.value = event.target.value
          }
        }
      })
    }
  }

  const handleChangeForEdit = (field, event) => {
    if (field === 1) {
      setkey(event.target.value)
      props.spec.key = event.target.value
    } else {
      setvalue(event.target.value)
      props.spec.value = event.target.value
    }
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Label"
            autoComplete="off"
            variant="outlined"
            className={classes.textfield}
            value={props.edit ? props.spec.key : key}
            onChange={(event) =>
              props.edit
                ? handleChangeForEdit(1, event)
                : handleChange(1, event)
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Value"
            autoComplete="off"
            variant="outlined"
            multiline
            rows={6}
            className={classes.textfield}
            value={props.edit ? props.spec.value : value}
            onChange={(event) =>
              props.edit
                ? handleChangeForEdit(2, event)
                : handleChange(2, event)
            }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default TechSpecsTextField
