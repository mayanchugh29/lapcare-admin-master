import React from "react"
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const options = [
  {
    name: "Percentage",
    value: 1,
  },
  {
    name: "Fixed",
    value: 2,
  },
]

const renderOptions = (value) => {
  return options.map((option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      control={<Radio checked={value === `${option.value}` ? true : false} />}
      label={option.name}
    />
  ))
}

const TypesCard = (props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>Types</Typography>
        <FormControl>
          <RadioGroup
            name="type"
            value={props.type}
            onChange={(e) => props.settype(e.target.value)}>
            {renderOptions(props.type)}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default TypesCard
