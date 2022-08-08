import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextEditor from "./TextEditor"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
})

const Description = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Title
          </Typography>
          <TextField
            name="name"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            autoComplete="off"
            className={classes.textfield}
            fullWidth
            onChange={props.onChange}
            value={props.values.name}
          />
          <TextEditor
            fieldName="longDescription"
            onChange={props.onChange}
            value={props.values.longDescription}
            setFieldValue={props.setFieldValue}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Description
