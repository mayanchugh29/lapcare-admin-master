import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { DataGrid } from "@material-ui/data-grid"
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

const Shipments = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [rows, setrows] = useState([])
  const rowsSelected = []
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowCount, setrowCount] = useState(0)

  const handleRowClick = async (e) => {
    props.history.push(`/shipments/${e.row.id}`)
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
      const response = await request("/shipments", props.token, { page })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.shipments.map((shipment) =>
          newRows.push({
            id: `${shipment._id}`,
            order_id_lapcare: `${shipment.order_id_lapcare.orderId}`,
            courier_name: `${shipment.courier_name}`,
            courier_id: `${shipment.courier_company_id}`,
            shipment_id: `${shipment.shipment_id}`,
            awb_code: `${shipment.awb_code}`,
            date: `${new Date(shipment.date).toLocaleString("en-GB", {
              timeZone: "Asia/Kolkata",
            })}`,
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
            msg: "Shipments could not be fetched!",
            type: "error",
          },
        })
        setloading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [props.token, dispatch, page])

  const handleExportShipments = async () => {
    const response = await request("/shipments/export", props.token)
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "shipments.csv")
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
      field: "order_id_lapcare",
      headerName: "Order Id Lapcare",
      width: 220,
      renderCell: (params) => (
        <Link className={classes.link} to={`/order/${params.value}`}>
          {params.value}
        </Link>
      ),
    },
    { field: "courier_name", headerName: "Courier Name", width: 180 },
    { field: "courier_id", headerName: "Courier Id", width: 120 },
    { field: "shipment_id", headerName: "Shipment Id", width: 140 },
    { field: "awb_code", headerName: "AWB Code", width: 160 },
    { field: "date", headerName: "Shipment Created Date", width: 210 },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Shipments
          </Typography>
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={handleExportShipments}>
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

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(Shipments))
