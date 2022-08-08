import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import CardwithTextEditor from "../components/Product/Description"
import PricingCard from "../components/Product/Pricing"
import InventoryCard from "../components/Product/Inventory"
import ShippingCard from "../components/Product/Shipping"
import LinkedProductCard from "../components/Product/LinkedProducts"
import ProductTagsCard from "../components/Product/Tags"
import ProductAvaiblityCard from "../components/Product/Avaibility"
import ProductCategories from "../components/Product/Categories"
import ProductFaqsCard from "../components/Product/Faq"
import ProductKeys from "../components/Product/KeysCard"
import ProductAttributes from "../components/Product/ProductAttributes"

import { connect, useDispatch } from "react-redux"
import { useFormik } from "formik"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import request from "../axios/post"
import getRequest from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "90px",
    display: "flex",
    justifyContent: "center",
  },
  page_content: {
    width: "90%",
  },
  page_header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "14px 0",
  },
  parent_container: {
    display: "flex",
    justifyContent: "space-between",
  },
  left_container: {
    width: "55%",
  },
  right_container: {
    width: "40%",
  },
})

const AddProduct = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [categories, setcategories] = useState([])
  const [selectedCategory, setselectedCategory] = useState()

  useEffect(() => {
    const getCategories = async () => {
      const response = await getRequest("/categories", props.token)
      if (response.status === 200) {
        setcategories(response.data.categories)
      } else {
      }
    }
    getCategories()
  }, [props.token])

  const formik = useFormik({
    initialValues: {
      name: "",
      longDescription: "",
      sku: "",
      modelNumber: "",
      category: "",
      productDimension: {
        length: 0,
        width: 0,
        height: 0,
        unit: "",
      },
      productWeight: {
        value: 0,
        unit: "",
      },
      packageDimension: {
        length: 0,
        width: 0,
        height: 0,
        unit: "",
      },
      packageWeight: {
        value: 0,
        unit: "",
      },
      costPrice: 0,
      sellingPrice: 0,
      tax: 0,
      productCode: {
        label: "",
        value: "",
      },
      avaibility: 0,
      quantity: 0,
      origin: "",
      tags: [],
      attributes: [],
      keys: [],
      faqs: [],
    },
    onSubmit: async (values) => {
      const response = await request("/product/new", values, props.token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            msg: "Product Added!",
            open: true,
          },
        })
        props.history.push("/products")
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            msg: "Product could not be added!",
            open: true,
          },
        })
      }
    },
  })

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.page_header}>
            <Typography variant="h5" gutterBottom>
              Add Product
            </Typography>
            <Button
              disableElevation
              type="submit"
              color="primary"
              variant="contained">
              Create Product
            </Button>
          </div>

          <div className={classes.parent_container}>
            <div className={classes.left_container}>
              <CardwithTextEditor
                onChange={formik.handleChange}
                values={formik.values}
                setFieldValue={formik.setFieldValue}
              />
              <PricingCard
                onChange={formik.handleChange}
                values={formik.values}
                tax={false}
              />
              <InventoryCard
                onChange={formik.handleChange}
                values={formik.values}
              />
              <ShippingCard
                onChange={formik.handleChange}
                values={formik.values}
                showShippingDetails={false}
              />
              <ProductFaqsCard setFieldValue={formik.setFieldValue} />
              <ProductKeys setFieldValue={formik.setFieldValue} edit={false} />
              <ProductAttributes
                selectedCategory={selectedCategory}
                setFieldValue={formik.setFieldValue}
                value={formik.values.attributes}
                edit={false}
              />
            </div>

            <div className={classes.right_container}>
              <LinkedProductCard />
              <ProductAvaiblityCard
                value={formik.values.avaibility}
                setFieldValue={formik.setFieldValue}
              />

              <ProductCategories
                categories={categories}
                value={formik.values.category}
                setFieldValue={formik.setFieldValue}
                setselectedCategory={setselectedCategory}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(AddProduct))
