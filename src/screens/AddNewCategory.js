import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import AddRoundedIcon from "@material-ui/icons/AddRounded"
import CardwithTextEditor from "../components/Product/Description"
import { useFormik } from "formik"
import UploadFile from "../components/Product/FileInput"
import TableRowAttribute from "../components/Category/TableRowAttribute"
import request from "../axios/post"
import { useDispatch, connect } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { withRouter } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "90px",
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
  buttons: {
    display: "inline-block",
  },
  table: {
    minWidth: 650,
  },
  atrributeContainer: {
    margin: "2rem 0",
  },
})

const AddNewCategory = (props) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
      longDescription: "",
      has_attributes: false,
      images: [],
      attributes: [],
    },
    onSubmit: async (values) => {
      const newCategory = new FormData()
      newCategory.append("name", values.name)
      newCategory.append("description", values.longDescription)
      newCategory.append("attributes", JSON.stringify(values.attributes))
      newCategory.append("has_attributes", values.has_attributes)
      for (let i = 0; i < values.images.length; i++) {
        newCategory.append("images", values.images[i])
      }

      const response = await request("/category/new", newCategory, props.token)
      if (response.status === 200) {
        props.history.push("/product/categories")
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "New Product Category added!",
            type: "success",
          },
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "New Product Category could not be added!",
            type: "error",
          },
        })
      }
    },
  })
  const classes = useStyles()
  const [rows, setrows] = useState([1])
  const [count, setcount] = useState(1)

  const addNewfield = () => {
    setrows((prev) => [...prev, count + 1])
    setcount(count + 1)
  }
  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              Add New Category
            </Typography>
            <div className={classes.buttons}>
              <Button
                disableElevation
                variant="contained"
                type="submit"
                color="primary">
                Save
              </Button>
            </div>
          </div>
          <CardwithTextEditor
            onChange={formik.handleChange}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
          />

          <UploadFile
            onChange={formik.handleChange}
            value={formik.values.images}
            fieldName="images"
            setFieldValue={formik.setFieldValue}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.has_attributes}
                onChange={formik.handleChange}
                name="has_attributes"
                color="primary"
              />
            }
            label="Add Attributes to the category"
            style={{
              margin: "2rem 0",
              textAlign: "center",
              fontSize: "2rem",
            }}
          />
          {formik.values.has_attributes ? (
            <div className={classes.atrributeContainer}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Is Mandatory</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Default Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRowAttribute
                        key={row}
                        rowId={row}
                        attributes={formik.values.attributes}
                        setFieldValue={formik.setFieldValue}
                      />
                    ))}
                  </TableBody>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => addNewfield()}>
                    <AddRoundedIcon
                      color="primary"
                      style={{ marginRight: "5px" }}
                    />
                    <Typography color="primary" variant="body1">
                      Add a new Field
                    </Typography>
                  </div>
                </Table>
              </TableContainer>
            </div>
          ) : null}
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

export default connect(mapStateToProps)(withRouter(AddNewCategory))
