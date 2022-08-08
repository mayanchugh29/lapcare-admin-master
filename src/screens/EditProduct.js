import React, { useEffect, useState } from "react"
import { makeStyles, Typography } from "@material-ui/core"
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
import getRequest from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import request from "../axios/put"

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
    width: "42%",
  },
})

const EditProduct = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const data = props.location.state.data

  const [categories, setcategories] = useState([])
  const [selectedCategory, setselectedCategory] = useState(data.category)

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
      name: data.name,
      longDescription: data.longDescription,
      sku: data.sku,
      modelNumber: data.modelNumber,
      category: data.category,
      productDimension:
        data.productDimension !== undefined
          ? data.productDimension
          : {
              length: 0,
              width: 0,
              height: 0,
              unit: "",
            },
      productWeight:
        data.productWeight !== undefined
          ? data.productWeight
          : {
              value: 0,
              unit: "",
            },
      packageDimension:
        data.packageDimension !== undefined
          ? data.packageDimension
          : {
              length: 0,
              width: 0,
              height: 0,
              unit: "",
            },
      packageWeight:
        data.packageWeight !== undefined
          ? data.packageWeight
          : {
              value: 0,
              unit: "",
            },
      costPrice: data.costPrice,
      sellingPrice: data.sellingPrice,
      tax: data.tax,
      productCode:
        data.productCode !== undefined
          ? data.productCode
          : {
              label: "",
              value: "",
            },
      avaibility: data.avaiblity,
      quantity: data.quantity,
      origin: data.origin,
      tags: data.tags,
      attributes: data.attributes,
      keys: data.keys,
      faqs: data.faqs,
    },
    onSubmit: async (values) => {
      const response = await request(
        `/product/${data._id}`,
        values,
        props.token
      )
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            msg: "Product Updated!",
            open: true,
          },
        })
        props.history.push("/products")
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            msg: "Product could not be updated!",
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
              Edit Product
            </Typography>
            <div>
              <Button color="primary" variant="outlined" disableElevation>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={`https://lapcare.com/product/${data.slug}/${data.sku}`}>
                  View Product
                </a>
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginLeft: "7px" }}
                disableElevation>
                Save Changes
              </Button>
            </div>
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
                showShippingDetails={true}
              />
              <ProductFaqsCard
                setFieldValue={formik.setFieldValue}
                value={formik.values.faqs}
                edit={true}
              />
              <ProductKeys
                setFieldValue={formik.setFieldValue}
                value={formik.values.keys}
                edit={true}
              />
              <ProductAttributes
                selectedCategory={selectedCategory}
                setFieldValue={formik.setFieldValue}
                value={formik.values.attributes}
                edit={true}
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
                category={data.category}
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

export default connect(mapStateToProps)(withRouter(EditProduct))
