import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { DataGrid } from "@material-ui/data-grid"
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { useSelector } from "react-redux"
import clsx from "clsx"
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
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: " underline",
    },
  },
})

const tableStyle = makeStyles({
  root: {
    "& .bold": {
      fontWeight: "bold",
    },
    "& .status.processed": {
      backgroundColor: "#b4f2e2",
      color: "#049570",
    },
    "& .status.initiated": {
      backgroundColor: "#fef6c5",
      color: "#b19f2c",
    },
  },
})

const Refunds = (props) => {
  const classes = useStyles()
  const styles = tableStyle()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const [rows, setrows] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowCount, setrowCount] = useState(0)

  useEffect(() => {
    let active = true

    ;(async () => {
      setloading(true)
      const response = await request("/refunds", token, { page })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.refunds.map((refund) =>
          newRows.push({
            id: `${refund.receipt}`,
            payment_id: `${refund.payment_id}`,
            refund_id: `${refund.refundId}`,
            amount: `${refund.amount / 100}`,
            status: `${refund.status[refund.status.length - 1].key}`,
            date: `${refund.date.slice(0, 10)}`,
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
            msg: "Refund data could not be fetched!",
            type: "error",
          },
        })
        setloading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [page, token, dispatch])

  const handleExportRefunds = async () => {
    const response = await request("/refunds/export", token)
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "refunds.csv")
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

  const columns = [
    {
      field: "id",
      headerName: "Order id",
      width: 220,
      renderCell: (params) => (
        <Link className={classes.link} to={`/order/${params.value}`}>
          {params.value}
        </Link>
      ),
    },
    { field: "payment_id", headerName: "Payment Id", width: 220 },
    { field: "refund_id", headerName: "Refund Id", width: 220 },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
      cellClassName: "bold",
    },
    {
      field: "status",
      headerName: "Refund status",
      width: 220,
      cellClassName: (params) =>
        clsx("status ", {
          initaited: params.value === "Refund Created",
          processed: params.value === "Refund Processed",
        }),
    },
    { field: "date", headerName: "Refund Created Date", width: 210 },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Razorpay Refunds
          </Typography>
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={handleExportRefunds}>
            Export
          </Button>
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
            disableSelectionOnClick
            loading={loading}
            onPageChange={(newPage) => {
              setPage(newPage)
            }}
            disableColumnFilter
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Refunds)
