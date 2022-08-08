import toastifyReducer from "./toastify"
import authReducer from "./auth"
import { combineReducers } from "redux"
import userReducer from "./user"

const rootReducer = combineReducers({
  toastifyReducer,
  authReducer,
  userReducer,
})

export default rootReducer
