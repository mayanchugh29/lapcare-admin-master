import * as actionTypes from "../actionTypes/auth"
import { updateObject } from "../utility"

const initialState = {
  token: null,
  error: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        error: false,
      })
    case actionTypes.AUTH_FAILURE:
      return updateObject(state, {
        error: true,
      })
    default:
      return state
  }
}

export default authReducer
