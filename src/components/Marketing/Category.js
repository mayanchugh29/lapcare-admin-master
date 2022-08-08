import React, { useState, useEffect } from "react"
import {
  TextField,
  Typography,
  makeStyles,
  Grid,
  IconButton,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useSelector } from "react-redux"
import request from "../../axios/get"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

const useStyles = makeStyles({
  productCard: {
    padding: "5px 15px",
  },
  inputField: {
    margin: "10px 0px",
  },
  inputLabel: {
    marginBottom: "4px",
  },
})

const CategoryCard = (props) => {
  const classes = useStyles()
  const [categoryList, setcategoryList] = useState([])
  const token = useSelector((state) => state.authReducer.token)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryItems, setcategoryItems] = useState([])

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await request("/categories", token)
      if (response.status === 200) {
        setcategoryList(response.data.categories)
      }
    }

    getAllCategories()
  }, [token])

  const itemAddHandler = () => {
    setcategoryItems((prev) => [...prev, selectedCategory])
    props.setcategories((prev) => [...prev, selectedCategory._id])
  }

  const itemDeleteHandler = (id) => {
    setcategoryItems(categoryItems.filter((item) => item._id !== id))
    props.setcategories(props.categories.filter((item) => item !== id))
  }

  const renderItemList = (item) => {
    return (
      <Grid container spacing={1} style={{ margin: "20px 0" }}>
        <Grid item xs={2}>
          <TextField id="id" label="Id" variant="outlined" value={item._id} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            value={item.name}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={() => {
              itemDeleteHandler(item._id)
            }}
            style={{ marginTop: "8px" }}>
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      <Typography variant="h6">Add Category</Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} className={classes.inputField}>
          <Autocomplete
            id="products"
            options={categoryList}
            value={selectedCategory}
            onChange={(event, value) => {
              setSelectedCategory(value)
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={2} className={classes.inputField}>
          <IconButton onClick={itemAddHandler}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {categoryItems.length !== 0
            ? categoryItems.map((item) => renderItemList(item))
            : null}
        </Grid>
      </Grid>
    </div>
  )
}

export default CategoryCard
