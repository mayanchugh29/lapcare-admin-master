import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { withRouter } from "react-router-dom"
import logo from "../assets/lapcare.png"
import { useFormik } from "formik"
import request from "../axios/post"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  parent_container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffed",
    
  },
  card: {
    width: "25%",
    padding: "2rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "3px",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    backgroundColor: "#ffff"
  },
  textfield: {
    marginBottom: "1rem",
  },

  button: {
    borderRadius: 4,
    marginTop: 10,
  },

  logo: {
    width: "240px",
    margin: "1rem 0 2rem 0",
  },

  form: {
    margin: "2rem 0",
  },
})

const Register = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      userLevel: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await request("/auth/register", values, props.token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "Account Created!",
            type: "success",
          },
        })
        props.history.push("/login")
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
      <div className={classes.parent_container}>
        <div className={classes.card}>
          <img src={logo} className={classes.logo} alt="logo" />
          <Typography variant="h5" gutterBottom align="center">
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              name="name"
              id="outlined-basic"
              size="small"
              label="Name"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />
            <TextField
              name="email"
              size="small"
              id="outlined-basic"
              type="email"
              label="Email"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="demo-simple-select-helper-label">
                User Level
              </InputLabel>
              <Select
                label="User Level"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                name="userLevel"
                className={classes.textfield}
                onChange={formik.handleChange}>
                <MenuItem value="masterAdmin">Master Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="logistics">Logistics</MenuItem>
                <MenuItem value="accounts">Accounts</MenuItem>
                <MenuItem value="customerSupport">Customer Support</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              size="small"
              name="password"
              type="password"
              label="Password"
              autoComplete="off"
              variant="outlined"
              className={classes.textfield}
              onChange={formik.handleChange}
              fullWidth
              spellCheck="false"
            />

            <Button
              variant="contained"
              color="primary"
              required
              className={classes.button}
              type="Submit"
              fullWidth
              disableElevation>
              Create Account
            </Button>
          </form>
          <div>
            <Typography variant="subtitle1" align="center">
              Already have an account?
              <span
                style={{ color: "blue", cursor: "pointer", marginLeft: "3px" }}
                onClick={() => props.history.push("/login")}>
                Sign In
              </span>
            </Typography>
          </div>
        </div>
      </div>
  )
}

export default withRouter(Register)
