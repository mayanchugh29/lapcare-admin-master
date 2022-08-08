import React, { useState, useEffect } from "react"
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
} from "@material-ui/core"
import OrderStatusCard from "../components/Order/OrderStatus"
import OrderActions from "../components/Order/OrderActions"
import ShippingCard from "../components/AddNewOrder/ShippingCard"
import { useFormik } from "formik"
import request from "../axios/get"
import { useSelector } from "react-redux"
import Autocomplete from "@material-ui/lab/Autocomplete"
import ProductCard from "../components/AddNewOrder/ProductCard"
import PricingCard from "../components/AddNewOrder/PricingCard"
import { useDispatch } from "react-redux"
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
  detailsCard: {
    padding: "5px 15px",
  },
  inputField: {
    margin: "10px 0px",
  },
  inputLabel: {
    marginBottom: "4px",
  },
})

const AddNewOrder = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const token = useSelector((state) => state.authReducer.token)
  const [customerEmail, setcustomerEmail] = useState("")
  const [customers, setcustomers] = useState([])
  const [selectedCustomerId, setselectedCustomerId] = useState()

  

  useEffect(() => {
    const getCustomer = async () => {
      const response = await request(`/users/${customerEmail}`, token)
      if (response.status === 200) {
        setcustomers(response.data.users)
      } else {
        dispatch({
          type:SET_TOASTIFY,
          payload:{
            open:true,
            type:'warning',
            msg:'No user found with the email id'
          }
        })
      }
    }
    if (customerEmail.length > 3) {
      getCustomer()
    }
  }, [customerEmail,dispatch,token])

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
        phoneNumber: "",
        landmark: "",
      },
      billingAddress: {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
        phoneNumber: "",
        landmark: "",
      },
    },
    onSubmit: (values) => {
      console.log(selectedCustomerId._id)
      console.log(values)
    },
  })

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit} className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Add New Order
          </Typography>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disableElevation>
            Submit
          </Button>
        </div>
        <Grid container spacing={4} alignItems="stretch">
          <Grid
            container
            spacing={4}
            item
            xs={8}
            className={classes.formSection}>
            <Grid item xs={12}>
              <Card className={classes.detailsCard}>
                <CardContent>
                  <Typography variant="h6">General Details</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.inputField}>
                      <Typography className={classes.inputLabel}>
                        Customer
                      </Typography>
                      <Autocomplete
                        fullWidth
                        variant="outlined"
                        className={classes.input}
                        options={customers}
                        getOptionLabel={(option) =>
                          `${option.email}, ${
                            option.fname + " " + option.lname
                          }`
                        }
                        value={selectedCustomerId}
                        onChange={(event, newValue) =>
                          setselectedCustomerId(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            onChange={(event) =>
                              setcustomerEmail(event.target.value)
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <ProductCard />
            </Grid>
            <Grid item xs={12}>
              <PricingCard />
            </Grid>
            <Grid item xs={12}>
              <ShippingCard
                values={formik.initialValues}
                handleChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container item xs={4} style={{ padding: "0" }}>
            <Grid item xs={12}>
              <OrderStatusCard />
              <OrderActions />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddNewOrder
