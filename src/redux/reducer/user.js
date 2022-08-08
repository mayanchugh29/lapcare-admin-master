import * as actionTypes from "../actionTypes/auth"
import { updateObject } from "../utility"

const initialState = {
  name: "",
  email: "",
  userRole: "",
  accountCreated: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return updateObject(state, {
        name: action.payload.name,
        email: action.payload.email,
        userRole: action.payload.userLevel,
        accountCreated: action.payload.date,
      })
    case actionTypes.LOGOUT_USER:
      return updateObject(state, {
        name: "",
        email: "",
        userRole: "",
        accountCreated: "",
      })
    default:
      return state
  }
}

export default userReducer
