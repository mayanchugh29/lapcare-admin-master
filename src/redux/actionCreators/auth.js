import { AUTH_FAILURE, AUTH_SUCCESS, LOGIN_USER } from "../actionTypes/auth"
import request from "../../axios/get"

export const loginUser = (token) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_SUCCESS,
      token: token,
    })
    const response = await request(`/me`, token)
    if (response.status === 200) {
      dispatch({
        type: LOGIN_USER,
        payload: response.data.userData,
      })
    } else {
      dispatch({
        type: AUTH_FAILURE,
        error: true,
      })
    }
  }
}
