import React, { useState, useEffect } from "react"
import Table from "../components/common/table"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import request from "../axios/get"
import CircularIndeterminate from "../components/common/Spinner"
import { useHistory } from "react-router"
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

const Discounts = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [rows, setrows] = useState([])
  const rowsSelected = []
  const [loading, setloading] = useState(false)
  const history = useHistory()

  const handleRowClick = async (e) => {
    props.history.push(`/order/${e.row.id}`)
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
    const getAllCoupons = async () => {
      const response = await request("/coupons", props.token)
      if (response.status === 200) {
        const types = {
          1: "Percentage",
          2: "Fixed",
        }
        response.data.coupons.map((coupon) =>
          setrows((prev) => [
            ...prev,
            {
              id: `${coupon._id}`,
              code: `${coupon.code}`,
              discountValue: `${coupon.discountValue}`,
              type: `${types[coupon.type]}`,
              limit: `${coupon.limit}`,
              validFrom: `${coupon.validity.start.slice(0, 10)}`,
              validUpto: `${coupon.validity.expiry.slice(0, 10)}`,
            },
          ])
        )
        setloading(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Coupons could not be fetched!",
            type: "error",
          },
        })
        setloading(false)
      }
    }
    getAllCoupons()
  }, [props.token,dispatch])

  const columns = [
    { field: "code", headerName: "Discount Code", width: 180 },
    { field: "discountValue", headerName: "Discount Value", width: 140 },
    { field: "type", headerName: "Type", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "validFrom", headerName: "Valid From", width: 180 },
    { field: "validUpto", headerName: "Valid Upto", width: 180 },
  ]

  const addNewClickHandler = () => {
    history.push("/marketing/add-discount")
  }

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Discounts
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={addNewClickHandler}>
            Add New Discount
          </Button>
        </div>
        {loading ? (
          <div
            style={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularIndeterminate />
          </div>
        ) : (
          <Table
            columns={columns}
            rows={rows}
            rowHeight={80}
            checkboxSelection="false"
            pageSize={50}
            tableHeight={800}
            tableWidth="100%"
            handleRowSelected={handleRowSelected}
            handleRowClick={handleRowClick}
            rowsPerPageOptions={[50]}
            disableColumnFilter
            disableColumnMenu
          />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(Discounts))
