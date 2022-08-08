import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Dropzone from "react-dropzone"
import { Card, Typography, CardContent, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import request from "../axios/put"
import { connect, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "medium",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  submitButtonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  thumb: {
    height: "200px",
    margin: "20px auto",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    padding: 4,
    boxSizing: "border-box",
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  },
  img: {
    display: "block",
    width: "100%",
    height: "100%",
  },
})

const EditImageModal = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [images, setImages] = useState([])
  const [newImages, setnewImages] = useState([])

  const closeHandler = () => {
    props.onClose()
  }

  const handleChange = (acceptedFiles) => {
    const arrData = []
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i]
      const obj = {
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
      }
      arrData.push(obj)
    }
    setnewImages(acceptedFiles)
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }

  const handleUpload = async () => {
    if (props.addNewImages) {
      const formData = new FormData()
      formData.append("imageCategory", props.imageCategory)
      formData.append("productId", props.id)
      for (let i = 0; i < newImages.length; i++) {
        formData.append("images", newImages[i])
      }
      const response = await request(
        `/products/bulkImages`,
        formData,
        props.token
      )
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Product Image Updated!",
            type: "success",
            open: true,
          },
        })
        props.setdata(response.data.product)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Something went wrong!",
            type: "error",
            open: true,
          },
        })
      }
    } else {
      const formData = new FormData()
      formData.append("index", props.imageIndex)
      formData.append("imageCategory", props.imageCategory)
      for (let i = 0; i < newImages.length; i++) {
        formData.append("images", newImages[i])
      }
      const response = await request(
        `/products/${props.id}/images`,
        formData,
        props.token
      )
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Product Image Updated!",
            type: "success",
            open: true,
          },
        })
        props.setdata(response.data.product)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Something went wrong!",
            type: "error",
            open: true,
          },
        })
      }
    }

    props.onClose()
  }

  const thumbs = images.map((file) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} alt="thumbs" />
      </div>
    </div>
  ))

  return (
    <Modal open={props.open} onClose={closeHandler}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom>
            Upload New Image
          </Typography>
          <div
            style={{
              border: "1px dashed grey",
              minHeight: 400,
              minWidth: 600,
              maxHeight: "content-height",
              textAlign: "center",
              padding: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Dropzone onDrop={(acceptedFiles) => handleChange(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div style={{ cursor: "pointer" }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  </div>
                  <aside className={classes.thumbsContainer}>{thumbs}</aside>
                </section>
              )}
            </Dropzone>
          </div>
          <div className={classes.submitButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpload()}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(EditImageModal)
