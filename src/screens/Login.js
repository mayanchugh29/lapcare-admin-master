import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import logo from "../assets/lapcare.png"
import { useFormik } from "formik"
import request from "../axios/post"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { loginUser } from "../redux/actionCreators/auth"

const useStyles = makeStyles({
  parent_container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffed"
  },
  card: {
    width: "25%",
    padding: "2rem",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "3px",
    height: "auto",
    maxHeight: "45vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    backgroundColor: "#ffff"
  },
  textfield: {
    marginBottom: "1rem"
  },

  button: {
    borderRadius: 4,
    marginTop: 10
  },

  logo: {
    width: "200px",
    textAlign: "center",
    margin: "1rem 0 2rem 0"
  },

  form: {
    margin: "2rem 0"
  }
})

const Login = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      const response = await request("/auth/login", values)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token)
        dispatch(loginUser(response.data.token))
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: "You are now Signed In!",
            type: "success"
          }
        })
        props.history.push("/")
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            open: true,
            msg: `${response.data}`,
            type: "error"
          }
        })
      }
    }
  })

  return (
    <div className={classes.parent_container}>
      <div className={classes.card}>
        <img src={logo} className={classes.logo} alt="logo" />
        <Typography variant="h5" gutterBottom align="center">
          Sign In
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            name="email"
            id="outlined-basic"
            type="email"
            label="Email"
            autoComplete="off"
            variant="outlined"
            size="small"
            className={classes.textfield}
            onChange={formik.handleChange}
            fullWidth
            spellCheck="false"
          />
          <TextField
            id="outlined-basic"
            name="password"
            type="password"
            label="Password"
            autoComplete="off"
            variant="outlined"
            size="small"
            className={classes.textfield}
            onChange={formik.handleChange}
            fullWidth
            spellCheck="false"
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="Submit"
            disableElevation
            fullWidth>
            Log In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)
