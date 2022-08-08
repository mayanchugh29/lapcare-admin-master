import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import TechSpecsTextField from "./TechSpecsTextfield"
import { useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  textfield: {
    display: "inline-block",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "14px 0",
  },
})

const ProductKeys = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [options, setOptions] = useState(
    props.edit && props.value.length !== 0 ? [] : [1]
  )
  const [count, setcount] = useState(2)
  const [techSpecs, settechSpecs] = useState([])
  const prevValue = props.value

  const addNewOption = () => {
    setcount(count + 1)
    setOptions((prev) => [...prev, count])
  }

  const handleConfirmVariants = () => {
    props.setFieldValue("keys", techSpecs)
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        type: "info",
        msg: "Your Fields are added in Technical Specifications!",
        open: true,
      },
    })
  }

  const handleConfirmVariantForEdit = () => {
    props.setFieldValue("keys", [...prevValue, ...techSpecs])
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        type: "info",
        msg: "Your Changes to Technical Specifications are saved!",
        open: true,
      },
    })
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Tech Specicifications
          </Typography>
          {props.edit ? (
            <div>
              {prevValue.map((value, i) => (
                <div key={i}>
                  <TechSpecsTextField objectId={i} spec={value} edit={true} />
                </div>
              ))}
              {options.map((option, i) => (
                <div key={i}>
                  <TechSpecsTextField
                    objectId={i}
                    techSpecs={techSpecs}
                    settechSpecs={settechSpecs}
                    edit={false}
                  />
                </div>
              ))}
              <div className={classes.buttonsContainer}>
                <Button
                  color="primary"
                  style={{ display: "inline-block" }}
                  onClick={addNewOption}
                  variant="outlined">
                  Add Field
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ display: "inline-block", marginLeft: "2rem" }}
                  onClick={handleConfirmVariantForEdit}>
                  Confirm Fields
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {options.map((option, i) => (
                <div>
                  <div key={i}>
                    <TechSpecsTextField
                      objectId={i}
                      techSpecs={techSpecs}
                      settechSpecs={settechSpecs}
                      edit={false}
                    />
                  </div>
                </div>
              ))}
              <div className={classes.buttonsContainer}>
                <Button
                  color="primary"
                  style={{ display: "inline-block" }}
                  onClick={addNewOption}
                  variant="outlined">
                  Add Field
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ display: "inline-block", marginLeft: "2rem" }}
                  onClick={handleConfirmVariants}>
                  Confirm Fields
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductKeys
