import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField, Typography } from "@material-ui/core"
import postRequest from "../axios/post"
import request from "../axios/get"
import { connect, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import ImageInput from "../components/ImageUpload/ImageInput"
import EditImages from "./EditImages"
import { useFormik } from "formik"

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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1rem .5rem",
  },
  imageUploadContainer: {
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "content",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "40px",
  },
  cancelButton: {
    backgroundColor: "#e63946",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#821921",
    },
  },
  image: {
    height: "200px",
    width: "200px",
  },
})

const ProductImages = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [sku, setsku] = useState()
  const [showData, setshowData] = useState(false)
  const [data, setdata] = useState()
  const dispatch = useDispatch()

  const handleSearch = async () => {
    const response = await request(`/products/${sku}`, props.token)
    if (response.status === 200) {
      setdata(response.data.productData)
      setshowData(true)
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Product could not be fetched!",
          type: "error",
          open: true,
        },
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      bannerImages: [],
      images: [],
    },
    onSubmit: async (values) => {
      const newProduct = new FormData()
      for (let i = 0; i < values.images.length; i++) {
        newProduct.append("images", values.images[i])
      }
      for (let i = 0; i < values.bannerImages.length; i++) {
        newProduct.append("bannerImages", values.bannerImages[i])
      }
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Product Images are uploading!",
          type: "info",
          open: true,
        },
      })
      const response = await postRequest(
        `/products/${data._id}/images`,
        newProduct,
        props.token
      )
      if (response.status === 200) {
        props.history.push("/products")
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Product Images Uploaded!",
            type: "success",
            open: true,
          },
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Product Images could not be Uploaded!",
            type: "error",
            open: true,
          },
        })
      }
    },
  })

  const cancelButtonHandler = () => {
    history.push("/products")
  }

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <Typography variant="h5" align="center" gutterBottom>
          Product Image Management
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "30px auto",
          }}>
          <Typography variant="h6" gutterBottom>
            Search Product by SKU
          </Typography>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="SKU"
              onChange={(event) => setsku(event.target.value)}
            />
            <Button
              disableElevation
              variant="contained"
              style={{ margin: "0 16px" }}
              color="primary"
              onClick={() => handleSearch()}>
              Search
            </Button>
          </div>
        </div>

        {showData ? (
          <div>
            <Typography variant="h6" align="center" gutterBottom>
              {data.name} (SKU:{data.sku})
            </Typography>
            {data.images.length === 0 ? (
              <div>
                <Typography variant="h6" align="center" gutterBottom>
                  Upload Product Images
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <div className={classes.imageUploadContainer}>
                    <ImageInput
                      heading="Product Images"
                      onChange={formik.handleChange}
                      value={formik.values.images}
                      fieldName="images"
                      setFieldValue={formik.setFieldValue}
                    />
                    <ImageInput
                      heading="Product Banners"
                      onChange={formik.handleChange}
                      value={formik.values.bannerImages}
                      fieldName="bannerImages"
                      setFieldValue={formik.setFieldValue}
                    />
                    <div className={classes.buttonContainer}>
                      <Button type="submit" variant="contained" color="primary">
                        Upload
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.cancelButton}
                        onClick={cancelButtonHandler}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <EditImages data={data} setdata={setdata} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(ProductImages)
