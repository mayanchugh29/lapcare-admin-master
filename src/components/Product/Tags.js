import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { ChipInput } from "material-ui-formik-components"

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
const Tags = (props) => {
  const classes = useStyles()
  const handleAddChip = (chip) => {
    const newValue = chip
    props.setFieldValue("tags", newValue)
  }

  const handleDeleteChip = (chip, index) => {
    props.value.splice(index, 1)
    props.setFieldValue("tags", props.value)
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Tags
          </Typography>
          <ChipInput
            name="tags"
            style={{ display: "inline-block", marginTop: "1rem" }}
            fullWidth
            id="outlined-basic"
            autoComplete="off"
            variant="outlined"
            onChange={(chip) => handleAddChip(chip)}
            value={props.value}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Tags
