import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormsModal from "./FormsModal"
import { DataGrid } from "@material-ui/data-grid"
import { useDispatch, useSelector } from "react-redux"
import request from "../../axios/get"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "20px",
  },
})

const ContactUs = (props) => {
  const token = useSelector((state) => state.authReducer.token)
  const classes = useStyles()
  const [modalValues, setModalValues] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const [rows, setrows] = useState([])
  const rowsSelected = []
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowCount, setrowCount] = useState(0)

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    let active = true

    ;(async () => {
      setloading(true)
      const response = await request(`/formData`, token, { type: 1, page })

      if (!active) {
        return
      }
      if (response.status === 200) {
        const newRows = []
        response.data.formData.map((form) =>
          newRows.push({
            id: `${form._id}`,
            name: `${form.data.name}`,
            email: `${form.data.email}`,
            contact: `${form.data.contact}`,
            city: `${form.data.city}`,
            state: `${form.data.state}`,
            country: `${form.data.country}`,
            date: `${form.date.slice(0, 10)}`,
            message: `${form.data.message}`,
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
            msg: "Contact Us FormData could not be fetched!",
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

  const handleRowSelected = async (e) => {
    rowsSelected.push(e.data.id)
    if (rowsSelected.includes(e.data.id)) {
      rowsSelected.splice(e.data.id, 1)
    } else {
      rowsSelected.push(e.data.id)
    }
  }

  const columns = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 140 },
    { field: "contact", headerName: "Contact", width: 120 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "message", headerName: "Message", width: 280 },
  ]

  const handleRowClick = async (e) => {
    let values = []
    rows.forEach((row) => {
      if (row.id === e.row.id) {
        columns.forEach(({ field, headerName }) => {
          values.push({ field: headerName, value: row[field] })
        })
        setModalValues(values)
      }
    })
    handleModalOpen()
  }

  return (
    <div className={classes.root}>
      <div style={{ width: "100%" }} className={classes.root}>
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
          onRowSelected={(e) => handleRowSelected(e)}
          onRowClick={(e) => handleRowClick(e)}
          rowsPerPageOptions={[50]}
          onPageChange={(newPage) => {
            setPage(newPage)
          }}
          disableColumnFilter
          disableColumnMenu
        />
      </div>
      <FormsModal
        open={modalOpen}
        onClose={handleModalClose}
        values={modalValues}
        operation="Reply"
      />
    </div>
  )
}

export default ContactUs
