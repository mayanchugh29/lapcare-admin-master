import React from "react"
import {
  makeStyles,
  Card,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core"
import { useFormik } from "formik"
import request from "../axios/post"
import { useDispatch, useSelector } from "react-redux"
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

const AddNewUser = () => {
  const token = useSelector((state) => state.authReducer.token)
  const dispatch = useDispatch()
  const classes = useStyles()

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      contact: "",
      password: "",
      address: {
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
    onSubmit: async (values) => {
      const response = await request("/client/register", values, token)
      if (response.status === 200) {
        formik.resetForm()
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Account created!",
            type: "success",
          },
        })
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
    },
  })

  return (
    <div className={classes.root}>
      <form
        className={classes.page_content}
        onSubmit={formik.handleSubmit}
        autoComplete="true">
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Add New User
          </Typography>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            type="submit">
            Submit
          </Button>
        </div>
        <Grid container spacing={4} alignItems="stretch">
          <Grid
            container
            spacing={4}
            item
            xs={6}
            className={classes.formSection}>
            <Grid item xs={12}>
              <Card className={classes.detailsCard}>
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ marginBottom: "20px" }}>
                    User Details
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        name="fname"
                        fullWidth
                        variant="outlined"
                        label="First Name"
                        className={classes.input}
                        value={formik.values.fname}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        name="lname"
                        fullWidth
                        variant="outlined"
                        label="Last Name"
                        className={classes.input}
                        value={formik.values.lname}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="email"
                        variant="outlined"
                        label="Email"
                        className={classes.input}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="contact"
                        variant="outlined"
                        label="Contact"
                        className={classes.input}
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="password"
                        variant="outlined"
                        label="Password"
                        className={classes.input}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <Grid item xs={12}>
              <Card className={classes.detailsCard}>
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ marginBottom: "20px" }}>
                    Address Details
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="address.fullName"
                        variant="outlined"
                        label="Full Name"
                        className={classes.input}
                        value={formik.values.address.fullName}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        name="address.addressLine1"
                        fullWidth
                        variant="outlined"
                        label="Address Line 1"
                        className={classes.input}
                        value={formik.values.address.addressLine1}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        name="address.addressLine2"
                        fullWidth
                        variant="outlined"
                        label="Address Line 2"
                        className={classes.input}
                        value={formik.values.address.addressLine2}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        name="address.landmark"
                        fullWidth
                        variant="outlined"
                        label="Landmark"
                        className={classes.input}
                        value={formik.values.address.landmark}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        name="address.city"
                        fullWidth
                        variant="outlined"
                        label="City"
                        className={classes.input}
                        value={formik.values.address.city}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="address.state"
                        variant="outlined"
                        label="State"
                        className={classes.input}
                        value={formik.values.address.state}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="address.pinCode"
                        variant="outlined"
                        label="Pincode"
                        lassName={classes.input}
                        value={formik.values.address.pinCode}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                      <TextField
                        fullWidth
                        name="address.phoneNumber"
                        variant="outlined"
                        label="Phone Number"
                        className={classes.input}
                        value={formik.values.address.phoneNumber}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddNewUser
