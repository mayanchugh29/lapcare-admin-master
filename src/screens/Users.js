import React, { useEffect, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { Typography, Button } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { Link } from "react-router-dom"

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

const Users = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [rows, setrows] = useState([])
  const rowsSelected = []
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowCount, setrowCount] = useState(0)

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

  useEffect(() => {
    let active = true

    ;(async () => {
      setloading(true)
      const response = await request("/users", props.token, { page })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.users.map((user) =>
          newRows.push({
            id: `${user._id}`,
            fname: `${user.fname}`,
            lname: `${user.lname}`,
            email: `${user.email}`,
            contact: `${user.contact}`,
            date: `${user.date.slice(0, 10)}`,
            reviews: `${user.reviews.length}`,
            cartValue: `${user.cartValue.length}`,
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
            msg: "Users could not be fetched!",
            type: "error",
          },
        })
      }
    })()

    return () => {
      active = false
    }
  }, [page, props.token, dispatch])

  const columns = [
    { field: "fname", headerName: "First Name", width: 160 },
    { field: "lname", headerName: "Last Name", width: 160 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "contact", headerName: "Contact", width: 200 },
    { field: "date", headerName: "User Since", width: 160 },
    { field: "reviews", headerName: "Reviews", width: 120 },
    { field: "cartValue", headerName: "Cart Volume", width: 140 },
  ]

  const handleExportClients = async () => {
    const response = await request("/clients/export", props.token)
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "clients.csv")
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
            Users
          </Typography>
          <div>
            <Link to="/user/add" style={{ textDecoration: "none" }}>
              <Button color="primary" variant="outlined" disableElevation>
                Add User
              </Button>
            </Link>
            <Link
              to="/customers/cart"
              style={{ textDecoration: "none", marginLeft: "7px" }}>
              <Button color="primary" variant="contained" disableElevation>
                Abandoned Carts
              </Button>
            </Link>
            <Button
              color="primary"
              disableElevation
              style={{ marginLeft: "7px" }}
              variant="contained"
              onClick={handleExportClients}>
              Export
            </Button>
          </div>
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
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(Users))
