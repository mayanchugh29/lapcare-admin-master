import React, { useEffect, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

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
  buttons: {
    display: "inline-block",
  },
})

const AbandonedCarts = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const [rows, setrows] = useState([])
  const rowsSelected = []
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowCount, setrowCount] = useState(0)
  useEffect(() => {
    let active = true

    ;(async () => {
      setloading(true)
      const response = await request("/clients/cart", token, { page })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.clients.forEach((user) => {
          let cartValue = 0
          user.cartValue.forEach((cart) => {
            cartValue += cart.product.sellingPrice
          })

          newRows.push({
            id: `${user._id}`,
            userName: `${user.fname + " " + user.lname}`,
            email: `${user.email}`,
            contact: `${user.contact}`,
            cartItems: `${user.cartValue.length}`,
            cartValue: `${cartValue}`,
            date: `${new Date(
              user.cartValue[user.cartValue.length - 1].date
            ).toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })}`,
          })
        })
        setloading(false)
        setrowCount(response.data.count)
        setrows(newRows)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Users could not be fetched!",
            type: "error",
          },
        })
      }
    })()

    return () => {
      active = false
    }
  }, [page, token, dispatch])

  const handleRowClick = async (e) => {
    props.history.push(`/customer/${e.row.id}`)
  }

  const handleRowSelected = async (e) => {
    rowsSelected.push(e.data.id)
    if (rowsSelected.includes(e.data.id)) {
      rowsSelected.splice(e.data.id, 1)
    } else {
      rowsSelected.push(e.data.id)
    }
  }

  const columns = [
    { field: "userName", headerName: "Customer Name", width: 380 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "contact", headerName: "Contact", width: 200 },
    { field: "cartItems", headerName: "Cart Volume", width: 140 },
    { field: "cartValue", headerName: "Cart Value", width: 180 },
    { field: "date", headerName: "Last Checked", width: 220 },
  ]

  const handleExportCarts = async () => {
    const response = await request("/carts/export", token)
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "carts.csv")
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

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Abandoned Carts
          </Typography>
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={handleExportCarts}>
            Export
          </Button>
        </div>
        <div style={{ width: "100%" }}>
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
  )
}

export default withRouter(AbandonedCarts)
