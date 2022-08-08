import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { Button, Card, CardContent, Typography } from "@material-ui/core"
import CircularIndeterminate from "../components/common/Spinner"
import request from "../axios/get"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "90px"
  },
  header: {
    margin: "20px 30px"
  },
  buttons: {
    display: "inline-block"
  },
  table: {
    minWidth: 650
  },
  categoryCard: {
    width: "80%",
    margin: "30px auto"
  },
  imageContainer: {
    width: "85%",
    margin: "20px auto",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
    border: "1px solid #d5d5d5",
    padding: "10px"
  },
  images: {
    height: "auto",
    width: "25%"
  },
  attributesTable: {
    width: "85%",
    margin: "20px auto",
    border: "1px solid #d5d5d5"
  }
})

const Categories = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await request("/categories", props.token)
      if (response.status === 200) {
        setCategories(response.data.categories)
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Product Ctegories could not be fetched!",
            type: "error"
          }
        })
        setloading(false)
      }
    }

    getAllCategories()
  }, [props.token, dispatch])

  const renderTypes = (typeData) => {
    switch (typeData) {
      case 1:
        return "Text"
      case 2:
        return "Number"
      case 3:
        return "Dropdown"
      case 4:
        return "Checkbox"
      default:
        break
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" align="center">
          Categories
        </Typography>
      </div>
      {loading ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <CircularIndeterminate />
        </div>
      ) : (
        <div>
          {categories.map((category, i) =>
            category.has_attributes ? (
              <Card key={i} className={classes.categoryCard}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {category.name}
                  </Typography>

                  <div className={classes.imageContainer}>
                    <img
                      className={classes.images}
                      src={category.images.sm}
                      alt="category"
                    />
                  </div>
                  <TableContainer className={classes.attributesTable}>
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
                        {category.attributes.map((attribute, i) => (
                          <TableRow key={i}>
                            <TableCell align="center">
                              <Checkbox
                                color="primary"
                                checked={attribute.isMandatory}></Checkbox>
                            </TableCell>
                            <TableCell align="center">
                              {attribute.name}
                            </TableCell>
                            <TableCell align="center">
                              {renderTypes(attribute.type)}
                            </TableCell>
                            <TableCell align="center">
                              {attribute.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        props.history.push({
                          pathname: "/product/category/edit",
                          state: category
                        })
                      }>
                      Edit Category
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div></div>
            )
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapStateToProps)(withRouter(Categories))
