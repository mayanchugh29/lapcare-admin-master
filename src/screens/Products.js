import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter, Link } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import ButtonComponent from "../components/common/button"
import Modal from "../components/Product/ImportProducts"
import { Button, Typography, TextField } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { DataGrid } from "@material-ui/data-grid"
import Autocomplete from "@material-ui/lab/Autocomplete"

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
  orderActionsContainer: {
    width: "40%",
    display: "flex",
    flexFlow: "row",
    margin: "14px 0",
    padding: "0",
  },
})

const AllProducts = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [open, setopen] = useState(false)
  const rowsSelected = []
  const [rows, setrows] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowCount, setrowCount] = useState(0)
  const [sku, setsku] = useState("")
  const [searchedProducts, setsearchedProducts] = useState([])
  const [selectedSku, setselectedSku] = useState()

  const columns = [
    {
      field: "image",
      headerName: "Product Image",
      width: 150,
      renderCell: (params) => (
        <img height={60} width={60} src={params.value} alt="product" />
      ),
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "productName", headerName: "Product", width: 480 },
    { field: "status", headerName: "Status", width: 180 },
    { field: "price", headerName: "Price", width: 180 },
    { field: "stock", headerName: "Stock", width: 180 },
  ]

  const handleRowClick = async (e, searchEvent) => {
    let id = ""
    if (searchEvent) {
      id = selectedSku
    } else {
      id = e.row.id
    }
    const response = await request(`/products/${id}`, props.token)
    if (response.status === 200) {
      props.history.push({
        pathname: "/product/edit",
        state: { data: response.data.productData },
      })
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "Something went wrong!",
          type: "error",
        },
      })
    }
  }

  const handleRowSelected = async (e) => {
    rowsSelected.push(e.data.id)
    if (rowsSelected.includes(e.data.id)) {
      rowsSelected.splice(e.data.id, 1)
    } else {
      rowsSelected.push(e.data.id)
    }
  }

  const handleExportProducts = async () => {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        open: true,
        msg: "Your file will start downloading soon!",
        type: "info",
      },
    })
    const response = await request("/products/export", props.token)
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "products.csv")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "Csv file could not be fetched!",
          type: "error",
        },
      })
    }
  }

  useEffect(() => {
    let active = true
    ;(async () => {
      setloading(true)
      const response = await request("/products/all", props.token, { page })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.products.map((product) =>
          newRows.push({
            id: `${product.sku}`,
            image: `${product.images[0]}`,
            productName: `${product.name}`,
            status: `${product.avaiblity}`,
            price: `${product.sellingPrice}`,
            stock: `${product.quantity}`,
          })
        )
        setloading(false)
        setrowCount(response.data.count)
        setrows(newRows)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Products could not be fetched!",
            type: "error",
          },
        })
      }
    })()

    return () => {
      active = false
    }
  }, [page, props.token, dispatch])

  useEffect(() => {
    const searchProductBySku = async () => {
      const response = await request("/search/products", props.token, { sku })
      if (response.status === 200) {
        setsearchedProducts(response.data.products)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Product could not be fetched!",
            type: "error",
          },
        })
      }
    }
    if (sku.length > 5) {
      searchProductBySku()
    }
  }, [sku, dispatch, props.token])

  return (
    <div>
      <Modal open={open} setopen={setopen} setloading={setloading} />
      <div className={classes.root}>
        <div className={classes.page_content}>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            <div className={classes.buttons}>
              <Button
                style={{ marginLeft: "8px" }}
                color="primary"
                variant="outlined"
                onClick={(event) => setopen(true)}>
                Import
              </Button>
              <Link
                to="/products/new"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}>
                <ButtonComponent
                  marginLeft="8px"
                  fontWeight="500"
                  color="#fcc101"
                  textColor="white"
                  buttonContent="Add Product"
                />
              </Link>
              <Button
                style={{ marginLeft: "8px" }}
                color="primary"
                variant="outlined"
                onClick={handleExportProducts}>
                Export
              </Button>
            </div>
          </div>
          <div className={classes.orderActionsContainer}>
            <Autocomplete
              fullWidth
              variant="outlined"
              options={searchedProducts}
              getOptionLabel={(option) => `${option.sku}, ${option.name}`}
              value={selectedSku}
              onChange={(event, newValue) => setselectedSku(newValue.sku)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="search product by sku"
                  onChange={(event) => setsku(event.target.value)}
                />
              )}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleRowClick(selectedSku, true)}
              style={{ marginLeft: "7px" }}>
              Search
            </Button>
          </div>
          <div style={{ width: "100%", minHeight: "500px" }}>
            <DataGrid
              pagination
              rows={rows}
              rowHeight={80}
              columns={columns}
              autoHeight={true}
              pageSize={50}
              rowCount={rowCount}
              checkboxSelection={false}
              paginationMode="server"
              onRowClick={(e) => handleRowClick(e)}
              onRowSelected={(e) => handleRowSelected(e)}
              loading={loading}
              onPageChange={(newPage) => {
                setPage(newPage)
              }}
              disableColumnFilter
              disableColumnMenu
              rowsPerPageOptions={[50]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(AllProducts))
