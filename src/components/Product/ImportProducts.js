import React, { useState } from "react"
import * as XLSX from "xlsx"
import request from "../../axios/post"
import { connect, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"
import putRequest from "../../axios/put"
import {
  Card,
  CardActions,
  Modal,
  Typography,
  makeStyles,
  Button,
  CardContent,
} from "@material-ui/core"
import Dropzone from "react-dropzone"
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30vw",
    padding: "7px 20px",
    outline: "none",
  },
  title: {
    textAlign: "center",
    fontWeight: "medium",
    fontSize: "1.3rem",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "4px",
  },
  value: {
    border: "1px solid #777",
    padding: "4px",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "14px",
  },
  thumb: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
    fontSize: "18px",
    fontWeight: "500",
  },
})

const ImportProducts = (props) => {
  const [data, setdata] = useState()
  const [files, setFiles] = useState([])
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleClose = () => {
    props.setopen(false)
  }

  const handleUpload = async () => {
    props.setloading(true)
    await httpRequest()
    props.setopen(false)
    props.setloading(false)
  }

  const handleUpdate = async () => {
    props.setloading(true)
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        open: true,
        msg: "Products are updating!",
        type: "info",
      },
    })
    await httpRequestforUpdateProducts()
    props.setopen(false)
    props.setloading(false)
  }

  const httpRequestforUpdateProducts = async () => {
    if (data !== null) {
      const response = await putRequest("/products/import", data, props.token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Products Updated!",
            type: "success",
          },
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Products Update Failed!",
            type: "error",
          },
        })
      }
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "Csv file doesn't have any data!",
          type: "warning",
        },
      })
    }
  }

  const httpRequest = async () => {
    if (data !== null) {
      const response = await request("/products/import", data, props.token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Products Uploaded !",
            type: "success",
          },
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Products Upload Failed !",
            type: "error",
          },
        })
      }
    } else {
      alert("File doesn't have any data")
    }
  }

  const handleChange = async (files) => {
    const reader = new FileReader()
    reader.onload = async (evt) => {
      const bstr = evt.target.result
      const workbook = XLSX.read(bstr, { type: "binary" })
      const sheetNames = workbook.SheetNames
      const sheetIndex = 1
      setdata(
        XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex - 1]])
      )
    }
    reader.readAsBinaryString(files[0])
    setFiles([
      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      }),
    ])
  }

  const thumbs = files.map((file) => (
    <div className={classes.thumb} key={file.name}>
      <p>{file.name}</p>
    </div>
  ))

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {" "}
            Import Products
          </Typography>
          <div
            style={{
              border: "1px dashed grey",
              minHeight: 200,
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
                    {files.length === 0 ? (
                      <div>
                        <CloudUploadRoundedIcon
                          color="primary"
                          fontSize="large"
                        />
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "grey",
                          }}>
                          Drag and drop your file here, or click to select file
                        </p>
                      </div>
                    ) : (
                      <aside>{thumbs}</aside>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <CardActions className={classes.buttonContainer}>
            <Button
              onClick={handleUpload}
              color="primary"
              variant="outlined"
              disabled
              disableElevation>
              Upload
            </Button>
            <Button
              onClick={handleUpdate}
              color="primary"
              variant="contained"
              disableElevation>
              Update
            </Button>
          </CardActions>
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

export default connect(mapStateToProps)(ImportProducts)
