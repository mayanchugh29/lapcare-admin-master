import React, {  useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ProductAttributesTextField from "./ProductAttributesTextField"
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
  faqSectionContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 14,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "14px",
  },
})

const ProductAttributes = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [attributes, setattributes] = useState([])
  const prevValues =props.value
  const handleConfirm = () => {
    props.setFieldValue("attributes", [...prevValues, ...attributes])
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        type: "info",
        msg: "Your Changes to Product Attributes are saved!",
        open: true,
      },
    })
  }
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Product Attributes
          </Typography>
          {props.selectedCategory !== undefined ? (
            <div>
              {props.selectedCategory.attributes.map((attribute, i) => (
                <ProductAttributesTextField
                  objectId={i}
                  key={i}
                  categoryAttribute={attribute}
                  attributes={attributes}
                  setattributes={setattributes}
                  prevValues={prevValues}
                />
              ))}
              <div className={classes.buttonsContainer}>
                <Button
                  style={{ width: "50%" }}
                  variant="outlined"
                  color="primary"
                  onClick={handleConfirm}>
                  Confirm
                </Button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                fontSize: "1.1rem",
                color: "silver",
                fontWeight: "500",
              }}>
              <p>Please select Category</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductAttributes
