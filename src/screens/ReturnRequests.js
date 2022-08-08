import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { Divider, TextField, Typography } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
import Autocomplete from "@material-ui/lab/Autocomplete"

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
    lineHeight: "5px",
    cursor: "pointer",
    textAlign: "center",
    color: "grey",
  },
  orderStatusCardActive: {
    padding: "0 7px",
    margin: "0",
    border: "1px solid #fcc101",
    lineHeight: "5px",
    cursor: "pointer",
    textAlign: "center",
    color: "#fcc101",
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
    "& .status.rejected": {
      backgroundColor: "#fdd1d2", //red - Payment Pending
      color: "#b32e30",
    },
    "& .status.approved": {
      backgroundColor: "#b4f2e2", //green - Order Paid
      color: "#049570",
    },
    "& .status.requested": {
      backgroundColor: "#fef6c5", //yellow - Processing
      color: "#b19f2c",
    },
    "& .status.shipped": {
      backgroundColor: "#9fd0e0", //blue - shipped
      color: "#094d63",
    },
    "& .status.replaced": {
      backgroundColor: "#e2e2e2", //grey - Delivered
      color: "#333",
    },
    "& .status.refunded": {
      backgroundColor: "#e2e2e2", //grey - Delivered
      color: "#333",
    },
    "& .status.cancelled": {
      backgroundColor: "#FF6161", //red - cancelled
      color: "#FFFFFF",
    },
  },
})

const ReturnRequests = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const styles = tableStyle()
  const activeReturnStatus = sessionStorage.getItem("activeReturnStatus")
  const currentPage = Number(sessionStorage.getItem("returnPage"))
  const [rows, setrows] = useState([])
  const [orderId, setorderId] = useState("")
  const [searchedOrders, setsearchedOrders] = useState([])
  const [selectedOrderId, setselectedOrderId] = useState()
  const [loading, setloading] = useState(true)
  const [activeStatus, setactiveStatus] = useState(
    activeReturnStatus ? activeReturnStatus : "All Returns"
  )
  const [page, setPage] = useState(currentPage ? currentPage : 0)
  const [rowCount, setrowCount] = useState(0)
  const returnStatus = [
    "All Returns",
    "Return Requested",
    "Return Approved",
    "Return Rejected",
    "Pickup Generated",
    "Refunded",
    "Replaced",
  ]

  //columns

  const columns = [
    { field: "orderId", headerName: "ID", width: 180 },
    { field: "date", headerName: "Date", width: 220 },
    { field: "customerName", headerName: "Customer", width: 380 },
    { field: "mode", headerName: "Mode", width: 120 },
    {
      field: "status",
      headerName: "Return Status",
      width: 180,
      cellClassName: (params) =>
        clsx("status ", {
          rejected: params.value === "Return Rejected",
          approved: params.value === "Return Approved",
          requested: params.value === "Return Requested",
          shipped: params.value === "Pickup Generated",
          replaced: params.value === "Replaced",
          refunded: params.value === "Refunded",
          cancelled: params.value === "Return Cancelled",
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
    {
      field: "returnReason",
      headerName: "Return Reason",
      width: 380,
    },
  ]

  const handleRowClick = async (e) => {
    console.log(e)
    props.history.push(`/returns/${e.row.id}`)
  }

  const handleOrderSearch = () => {
    props.history.push(`/return/${selectedOrderId.orderId}`)
  }

  useEffect(() => {
    let active = true

    ;(async () => {
      setloading(true)
      const response = await request(`/returns`, props.token, {
        page,
        returnStatus: activeStatus,
      })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.returns.map((item) =>
          newRows.push({
            id: item._id,
            orderId: item.order.orderId,
            date: `${new Date(item.date).toLocaleString("en-GB", {
              timeZone: "Asia/Kolkata",
            })}`,
            customerName: `${item.userId.fname + " " + item.userId.lname}`,
            mode: item.mode === 1 ? "Refund" : "Replacement",
            status: item.returnStatus[item.returnStatus.length - 1].status,
            payment: item.order.paymentMethod,
            returnReason: item.returnReason.main,
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
            msg: "Return Orders could not be fetched!",
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
            msg: "Return request could not be fetched!",
            type: "error",
          },
        })
      }
    }
    if (orderId.length > 5) {
      searchOrderById()
    }
  }, [orderId, dispatch, props.token])

  const handleExportOrders = async () => {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        open: true,
        msg: "Your file will start downloading soon!",
        type: "info",
      },
    })
    const response = await request("/returns/export", props.token)
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "returns.csv")
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
            Returns
          </Typography>
          <div>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={handleExportOrders}>
              Export
            </Button>
          </div>
        </div>
        <div className={classes.orderStatusFilterContainer}>
          {returnStatus.map((name, i) => (
            <div
              className={
                activeStatus === name
                  ? classes.orderStatusCardActive
                  : classes.orderStatusCard
              }
              key={i}
              onClick={() => {
                setactiveStatus(name)
                sessionStorage.setItem("activeReturnStatus", name)
                setPage(0)
                sessionStorage.setItem("returnPage", 0)
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
            checkboxSelection={false}
            paginationMode="server"
            loading={loading}
            page={page}
            onRowClick={(e) => handleRowClick(e)}
            onPageChange={(newPage) => {
              setPage(newPage.page)
              sessionStorage.setItem("returnPage", `${newPage.page}`)
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

export default connect(mapStateToProps)(withRouter(ReturnRequests))
