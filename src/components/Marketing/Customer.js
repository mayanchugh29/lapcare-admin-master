import React, { useState, useEffect } from "react"
import {
  makeStyles,
  TextField,
  Grid,
  IconButton,
} from "@material-ui/core"
import request from "../../axios/get"
import { useSelector } from "react-redux"
import Autocomplete from "@material-ui/lab/Autocomplete"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { useDispatch } from "react-redux"
import {SET_TOASTIFY} from '../../redux/actionTypes/toastify'

const useStyles = makeStyles({
  detailsCard: {
    padding: "5px 15px",
  },
  inputField: {
    margin: "10px 0px",
    display: "flex",
    padding: "0 10px",
  },
  inputLabel: {
    marginBottom: "4px",
  },
})

const Customer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const token = useSelector((state) => state.authReducer.token)
  const [customerEmail, setcustomerEmail] = useState("")
  const [customers, setcustomers] = useState([])
  const [selectedCustomers, setselectedCustomers] = useState([])
  const [selectedCustomer, setselectedCustomer] = useState(null)
  

  useEffect(() => {
    const getCustomer = async () => {
      const response = await request(`/users/${customerEmail}`, token)
      if (response.status === 200) {
        setcustomers(response.data.users)
      } else {
        dispatch({
          type:SET_TOASTIFY,
          payload:{
            type:'warning',
            msg:"No user found!",
            open:true
          }
        })
      }
    }
    if (customerEmail.length > 3) {
      getCustomer()
    }
  }, [customerEmail,dispatch,token])

  const itemAddHandler = () => {
    setselectedCustomers((prev) => [...prev, selectedCustomer])
    props.setusers((prev) => [...prev, selectedCustomer._id])
  }

  const itemDeleteHandler = (id) => {
    setselectedCustomers(selectedCustomers.filter((item) => item._id !== id))
    props.setusers(props.users.filter((item) => item !== id))
  }

  const renderItemList = (item) => {
    return (
      <Grid container spacing={1} style={{ marginBottom: "14px" }}>
        <Grid item xs={2}>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            value={item.email}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={item.fname + " " + item.lname}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={() => {
              itemDeleteHandler(item._id)
            }}>
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.inputField}>
        <Autocomplete
          variant="outlined"
          className={classes.input}
          options={customers}
          getOptionLabel={(option) =>
            `${option.email}, ${option.fname + " " + option.lname}`
          }
          value={selectedCustomer}
          onChange={(event, newValue) => setselectedCustomer(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ minWidth: "500px" }}
              variant="outlined"
              size="small"
              onChange={(event) => setcustomerEmail(event.target.value)}
            />
          )}
        />
        <IconButton onClick={itemAddHandler}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        {selectedCustomers.length !== 0
          ? selectedCustomers.map((item) => renderItemList(item))
          : null}
      </Grid>
    </Grid>
  )
}

export default Customer
