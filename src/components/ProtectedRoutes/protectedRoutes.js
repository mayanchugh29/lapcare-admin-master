import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route } from "react-router-dom"
import { withRouter, Redirect } from "react-router-dom"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"
import Home from "../../screens/Home"

const restrictedEndpoints = [
  {
    role: "logistics",
    access: ["/shipments", "/orders", "/order/:id", "/"],
  },
  {
    role: "accounts",
    access: ["/orders", "/order/:id", "/"],
  },
  {
    role: "customerSupport",
    access: ["/orders", "/order/:id", "/shipments", "/forms", "/"],
  },
]

const ProtectedRoute = (props) => {
  const dispatch = useDispatch()
  const userRole = useSelector((state) => state.userReducer.userRole)
  const error = useSelector((state) => state.authReducer.error)
  const token = localStorage.getItem("token")
  if (token === null || token === undefined || error) {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        open: true,
        msg: "Session Expired!",
        type: "info",
      },
    })
    return <Redirect to="/login" />
  } else {
    for (let i = 0; i < restrictedEndpoints.length; i++) {
      if (restrictedEndpoints[i].role === userRole) {
        if (restrictedEndpoints[i].access.includes(props.path)) {
          return <Route path={props.path} exact component={props.element} />
        } else {
          dispatch({
            type: SET_TOASTIFY,
            payload: {
              open: true,
              msg: "You do not have the access to visit the requested route!",
              type: "info",
            },
          })
          return <Route path="/" exact component={Home} />
        }
      }
      if (i === restrictedEndpoints.length - 1) {
        return <Route path={props.path} exact component={props.element} />
      }
    }
  }
}

export default withRouter(ProtectedRoute)
