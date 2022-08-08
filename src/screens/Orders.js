import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { Divider, MenuItem, TextField, Typography } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { Button } from "@material-ui/core"
import putRequest from "../axios/put"
import { DataGrid } from "@material-ui/data-grid"
import Autocomplete from "@material-ui/lab/Autocomplete"
import ExportModal from "../components/Order/ExportModal"
import ImportModal from "../components/Order/ImportModal"

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
  orderStatusFilterContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexFlow: "row nowrap",
    margin: "14px 0",
    justifyItems: "center",
  },
  orderActionsContainer: {
    width: "40%",
    display: "flex",
    flexFlow: "row",
    margin: "14px 0",
    padding: "0",
  },
  orderStatusCard: {
    padding: "0 7px",
    margin: "0",
    border: "1px solid #fcc101",
    lineHeight: "14px",
    cursor: "pointer",
    textAlign: "center",
    color: "grey",
  },
  orderStatusCardActive: {
    padding: "0 7px",
    margin: "0",
    border: "1px solid #fcc101",
    cursor: "pointer",
    textAlign: "center",
    color: "#fcc101",
    lineHeight: "14px",
  },
})

const tableStyle = makeStyles({
  root: {
    "& .bold": {
      fontWeight: "bold",
    },
    "& .payment.prepaid": {
      backgroundColor: "#e2e2e2", //grey - Prepaid
      color: "#333",
    },
    "& .payment.cod": {
      backgroundColor: "#f8ceb3", //orange - COD
      color: "#b94a03",
    },
    "& .status.paymentPending": {
      backgroundColor: "#fdd1d2", //red - Payment Pending
      color: "#b32e30",
    },
    "& .status.paymentFailed": {
      backgroundColor: "#fdd1d2", //red - Payment Failed
      color: "#b32e30",
    },
    "& .status.paid": {
      backgroundColor: "#b4f2e2", //green - Order Paid
      color: "#049570",
    },
    "& .status.confirmed": {
      backgroundColor: "#f1e5dc", //brown - Shipped
      color: "#a27a64",
    },
    "& .status.processing": {
      backgroundColor: "#fef6c5", //yellow - Processing
      color: "#b19f2c",
    },
    "& .status.shipped": {
      backgroundColor: "#9fd0e0", //blue - shipped
      color: "#094d63",
    },
    "& .status.delivered": {
      backgroundColor: "#e2e2e2", //grey - Delivered
      color: "#333",
    },
    "& .status.cancelled": {
      backgroundColor: "#FF6161", //red - cancelled
      color: "#FFFFFF",
    },
  },
})

const orderStatus = [
  "All Orders",
  "Payment Pending",
  "Order Placed",
  "Payment Failed",
  "Order Cancelled",
  "Order Confirmed",
  "Order Processing",
  "Order Shipped",
  "Order Delivered",
  "Return Initiated",
  "RTO",
]

const bulkActions = [
  {
    name: "Bulk Actions",
    id: 1,
  },
  {
    name: "Mark Order to Processing",
    id: 2,
  },
  {
    name: "Change status to cancelled",
    id: 3,
  },
  {
    name: "Mark Order as Delivered",
    id: 4,
  },
]

const columns = [
  { field: "id", headerName: "ID", width: 180 },
  { field: "date", headerName: "Date", width: 220 },
  { field: "customerName", headerName: "Customer", width: 380 },
  { field: "total", headerName: "Total", width: 120, cellClassName: "bold" },
  {
    field: "status",
    headerName: "Order Status",
    width: 180,
    cellClassName: (params) =>
      clsx("status ", {
        paymentFailed: params.value === "Payment Failed",
        paymentPending: params.value === "Payment Pending",
        paid: params.value === "Order Placed",
        confirmed: params.value === "Order Confirmed",
        processing: params.value === "Order Processing",
        shipped: params.value === "Order Shipped",
        delivered: params.value === "Order Delivered",
        cancelled: params.value === "Order Cancelled",
      }),
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 180,
    cellClassName: (params) =>
      clsx("payment ", {
        prepaid: params.value === "Prepaid",
        cod: params.value === "COD",
      }),
  },
]

const Orders = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const styles = tableStyle()
  const activeOrderStatus = sessionStorage.getItem("activeOrderStatus")
  const currentPage = Number(sessionStorage.getItem("orderPage"))
  const [openImportModal, setopenImportModal] = useState(false)
  const [openExportModal, setopenExportModal] = useState(false)
  const [rows, setrows] = useState([])
  const [orderId, setorderId] = useState("")
  const [searchedOrders, setsearchedOrders] = useState([])
  const [selectedOrderId, setselectedOrderId] = useState()
  const [rowsSelected, setrowsSelected] = useState([])
  const [loading, setloading] = useState(true)
  const [activeStatus, setactiveStatus] = useState(
    activeOrderStatus ? activeOrderStatus : "All Orders"
  )
  const [selectedBulkAction, setselectedBulkAction] = useState(1)
  const [page, setPage] = useState(currentPage ? currentPage : 0)
  const [rowCount, setrowCount] = useState(0)

  const handleRowClick = async (e) => {
    props.history.push(`/order/${e.row.id}`)
  }

  const handleOrderSearch = () => {
    props.history.push(`/order/${selectedOrderId.orderId}`)
  }

  const handleBulkAction = async () => {
    if (selectedBulkAction === 1) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "Please select a bulk action",
          type: "info",
        },
      })
    } else {
      const data = {
        orders: rowsSelected,
        statusId: selectedBulkAction,
      }
      const response = await putRequest("/orders/bulkUpdate", data, props.token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Orders Updated",
            type: "success",
          },
        })
        window.location.reload()
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: `${response.data}`,
            type: "error",
          },
        })
      }
    }
  }

  useEffect(() => {
    let active = true

    ;(async () => {
      setloading(true)
      const response = await request(`/orders`, props.token, {
        page,
        orderStatus: activeStatus,
      })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.orders.map((order) =>
          newRows.push({
            id: `${order.orderId}`,
            date: `${new Date(order.date).toLocaleString("en-GB", {
              timeZone: "Asia/Kolkata",
            })}`,
            customerName: `${order.userId.fname + " " + order.userId.lname}`,
            total: `${order.totalPrice}`,
            status: `${order.orderStatus[order.orderStatus.length - 1].status}`,
            payment: `${order.paymentMethod}`,
          })
        )
        setrowCount(response.data.count)
        setrows(newRows)
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Orders could not be fetched!",
            type: "error",
          },
        })
        setloading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [page, props.token, activeStatus, dispatch])

  useEffect(() => {
    const searchOrderById = async () => {
      const response = await request("/search/orders", props.token, { orderId })
      if (response.status === 200) {
        setsearchedOrders(response.data.orders)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Orders could not be fetched!",
            type: "error",
          },
        })
      }
    }
    if (orderId.length > 5) {
      searchOrderById()
    }
  }, [orderId, dispatch, props.token])

  return (
    <div className={classes.root}>
      <ExportModal
        setopenExportModal={setopenExportModal}
        openExportModal={openExportModal}
      />
      <ImportModal open={openImportModal} setopen={setopenImportModal} />
      <div className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Orders
          </Typography>
          <div>
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              onClick={() => setopenImportModal(true)}>
              Import & Update
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              style={{ marginLeft: "7px" }}
              onClick={() => setopenExportModal(true)}>
              Export
            </Button>
          </div>
        </div>
        <div className={classes.orderStatusFilterContainer}>
          {orderStatus.map((name, i) => (
            <div
              className={
                activeStatus === name
                  ? classes.orderStatusCardActive
                  : classes.orderStatusCard
              }
              key={i}
              onClick={() => {
                setactiveStatus(name)
                sessionStorage.setItem("activeOrderStatus", name)
                setPage(0)
                sessionStorage.setItem("orderPage", 0)
              }}>
              <p>{name}</p>
              <Divider orientation="vertical" />
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
          <div className={classes.orderActionsContainer}>
            <TextField
              select
              variant="outlined"
              value={selectedBulkAction}
              onChange={(e) => setselectedBulkAction(e.target.value)}
              size="small">
              {bulkActions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBulkAction}
              style={{ marginLeft: "7px" }}>
              Apply
            </Button>
          </div>
          <div className={classes.orderActionsContainer}>
            <Autocomplete
              fullWidth
              variant="outlined"
              options={searchedOrders}
              getOptionLabel={(option) =>
                `${option.orderId}, ${
                  option.userId.fname + " " + option.userId.lname
                }`
              }
              value={selectedOrderId}
              onChange={(event, newValue) => setselectedOrderId(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="search order by id"
                  onChange={(event) => setorderId(event.target.value)}
                />
              )}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOrderSearch}
              style={{ marginLeft: "7px" }}>
              Search
            </Button>
          </div>
        </div>

        <div style={{ width: "100%" }} className={styles.root}>
          <DataGrid
            pagination
            rows={rows}
            rowHeight={80}
            columns={columns}
            autoHeight={true}
            pageSize={50}
            rowCount={rowCount}
            checkboxSelection={true}
            paginationMode="server"
            loading={loading}
            page={page}
            onRowClick={(e) => handleRowClick(e)}
            onPageChange={(newPage) => {
              setPage(newPage)
              sessionStorage.setItem("orderPage", `${newPage}`)
            }}
            onSelectionModelChange={(e) => {
              setrowsSelected(e)
            }}
            rowsPerPageOptions={[50]}
            disableColumnFilter
            disableColumnMenu
            disableSelectionOnClick={true}
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

export default connect(mapStateToProps)(withRouter(Orders))
