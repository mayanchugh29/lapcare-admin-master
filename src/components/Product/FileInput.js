import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Dropzone from "react-dropzone"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
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
})

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 120,
  height: 120,
  padding: 4,
  boxSizing: "border-box",
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "100%",
  height: "100%",
}

const FileInput = (props) => {
  const classes = useStyles()
  const [files, setFiles] = useState(props.value)

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

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
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="thumbs" />
      </div>
    </div>
  ))

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            {props.label}
          </Typography>
          <div
            style={{
              border: "1px dashed grey",
              height: 300,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Dropzone onDrop={(acceptedFiles) => handleChange(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag and drop some files here, or click to select files{" "}
                    </p>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              )}
            </Dropzone>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FileInput
