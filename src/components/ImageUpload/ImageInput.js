import React, { useState } from "react"
import Dropzone from "react-dropzone"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    width: "1100px",
    margin: "20px auto",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  bannerThumb: {
    height: "400px",
    margin: "20px auto",
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    padding: 4,
    boxSizing: "border-box",
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 160,
    height: 160,
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

const ImageInput = (props) => {
  const classes = useStyles()
  const [images, setImages] = useState([])

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
    props.setFieldValue(`${props.fieldName}`, acceptedFiles)
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }

  const thumbs = images.map((file) => (
    <div
      className={
        props.heading === "Product Images" ? classes.thumb : classes.bannerThumb
      }
      key={file.name}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} alt="thumbs" />
      </div>
    </div>
  ))

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom>
            {props.heading}
          </Typography>
          <div
            style={{
              border: "1px dashed grey",
              minHeight: 400,
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
        </CardContent>
      </Card>
    </div>
  )
}

export default ImageInput
