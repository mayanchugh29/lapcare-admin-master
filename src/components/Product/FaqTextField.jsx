import { TextField, makeStyles, Grid } from "@material-ui/core"
import React, { useState } from "react"

const useStyles = makeStyles({
  textfield: {
    margin: "8px 0",
  },
})

const FaqTextField = (props) => {
  const classes = useStyles()
  const [key, setkey] = useState(props.edit ? props.faq.key : "")
  const [value, setvalue] = useState(props.edit ? props.faq.key : "")
  const [functionCalled, setfunctionCalled] = useState(false)

  const handleChange = (field, event) => {
    if (field === 1) {
      setkey(event.target.value)
    } else {
      setvalue(event.target.value)
    }

    if (functionCalled === false) {
      const object = {
        key,
        value,
      }
      props.setfaqs((prev) => [...prev, object])
      setfunctionCalled(true)
    } else {
      props.faqs.forEach((faq, i) => {
        if (i === props.objectId) {
          if (field === 1) {
            faq.key = event.target.value
          } else {
            faq.value = event.target.value
          }
        }
      })
    }
  }
  const handleChangeForEdit = (field, event) => {
    if (field === 1) {
      setkey(event.target.value)
      props.faq.key = event.target.value
    } else {
      setvalue(event.target.value)
      props.faq.value = event.target.value
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Question"
            autoComplete="off"
            variant="outlined"
            className={classes.textfield}
            value={props.edit ? props.faq.key : key}
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
            label="Answer"
            autoComplete="off"
            variant="outlined"
            value={props.edit ? props.faq.value : value}
            className={classes.textfield}
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

export default FaqTextField
