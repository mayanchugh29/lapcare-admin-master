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

const ProductCard = (props) => {
  const classes = useStyles()
  const [productList, setProductList] = useState([])
  const token = useSelector((state) => state.authReducer.token)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await request("/products/all", token)
      if (response.status === 200) {
        setProductList(response.data.products)
      }
    }

    getAllProducts()
  }, [token])

  const itemAddHandler = () => {
    setCartItems([
      ...cartItems,
      {
        ...selectedProduct,
      },
    ])
    props.setproducts((prev) => [...prev, selectedProduct._id])
  }

  const itemDeleteHandler = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id))
    props.setproducts(props.products.filter((item) => item !== id))
  }

  const renderItemList = (item) => {
    return (
      <Grid container spacing={1} style={{ margin: "20px 0" }}>
        <Grid item xs={2}>
          <TextField id="sku" label="SKU" variant="outlined" value={item.sku} />
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
        <Grid item xs={2}>
          <TextField
            id="sellingPrice"
            label="Selling Price"
            variant="outlined"
            value={item.sellingPrice}
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
      <Typography variant="h6">Add Product</Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} className={classes.inputField}>
          <Autocomplete
            id="products"
            options={productList}
            value={selectedProduct}
            onChange={(event, value) => {
              setSelectedProduct(value)
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                fullWidth
                variant="outlined"
                style={{ minWidth: "300px" }}
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
          {cartItems.length !== 0
            ? cartItems.map((item) => renderItemList(item))
            : null}
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductCard
