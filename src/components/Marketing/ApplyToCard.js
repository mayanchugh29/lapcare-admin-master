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
import ProductCard from "../Marketing/Product"
import CategoryCard from "./Category"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const ApplyToCard = (props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle}>Applies to</Typography>
        <FormControl>
          <RadioGroup>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="All Products"
              onChange={() => {
                props.setisCategorySpecific(false)
                props.setisProductSpecific(false)
              }}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Specific Category"
              onChange={() => {
                props.setisCategorySpecific(true)
                props.setisProductSpecific(false)
              }}
            />

            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Specific Products"
              onChange={() => {
                props.setisCategorySpecific(false)
                props.setisProductSpecific(true)
              }}
            />
          </RadioGroup>
        </FormControl>
        {props.isProductSpecific ? (
          <ProductCard
            products={props.products}
            setproducts={props.setproducts}
          />
        ) : null}
        {props.isCategorySpecific ? (
          <CategoryCard
            categories={props.categories}
            setcategories={props.setcategories}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}

export default ApplyToCard
