import React, { useState } from "react"
import { Card, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import EditImageModal from "./EditImageModal"

const useStyles = makeStyles({
  uploadedImages: {
    padding: "20px 40px",
    margin: "40px",
  },
  heading: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "medium",
  },
  image: {
    height: "200px",
    width: "200px",
    margin: "20px 0",
  },
  banner: {
    height: "220px",
    width: "500px",
    margin: "40px 0",
  },
})

const EditImages = (props) => {
  const classes = useStyles()
  const [openEditImageModal, setOpenEditImageModal] = useState(false)
  const [imageIndex, setimageIndex] = useState()
  const [imageCategory, setimageCategory] = useState(1)
  const [addNewImages, setaddNewImages] = useState(false)

  const openEditImageModalHandler = (index, category) => {
    if (index === false) {
      setaddNewImages(true)
      setimageCategory(category)
      setOpenEditImageModal(true)
    } else {
      setimageIndex(index)
      setimageCategory(category)
      setOpenEditImageModal(true)
    }
  }

  const closeEditImageModalHandler = () => {
    setOpenEditImageModal(false)
  }

  return (
    <div className={classes.uploadedImagesContainer}>
      <Card className={classes.uploadedImages}>
        <Typography variant="h5" align="center">
          Product Images
        </Typography>
        <div className={classes.heading}>
          <Typography variant="h5">Images</Typography>
          <Typography variant="h5">Position</Typography>
        </div>
        {props.data.images.map((image, index) => {
          return (
            <div key={index} className={classes.imageContainer}>
              <img className={classes.image} src={image} alt="" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "60px",
                }}>
                <p>{index + 1}</p>
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => openEditImageModalHandler(index, 1)}>
                    Change
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </Card>
      <Card className={classes.uploadedImages}>
        <Typography variant="h5" align="center" gutterBottom>
          Product Banners
        </Typography>
        <div className={classes.heading}>
          <Typography variant="h5">Images</Typography>
          <Typography variant="h5">Position</Typography>
        </div>
        {props.data.bannerImages.map((image, index) => {
          return (
            <div key={index} className={classes.imageContainer}>
              <img className={classes.banner} src={image} alt="" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "60px",
                }}>
                <p>{index + 1}</p>
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => openEditImageModalHandler(index, 2)}>
                    Change
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </Card>
      <EditImageModal
        open={openEditImageModal}
        onClose={closeEditImageModalHandler}
        imageIndex={imageIndex}
        id={props.data._id}
        setdata={props.setdata}
        imageCategory={imageCategory}
        addNewImages={addNewImages}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={() => openEditImageModalHandler(false, 1)}>
          Add More Product Images
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={() => openEditImageModalHandler(false, 2)}>
          Add More Product Banners
        </Button>
      </div>
    </div>
  )
}

export default EditImages
