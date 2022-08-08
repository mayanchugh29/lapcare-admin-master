import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles/index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducer/rootReducer"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { loginUser } from "./redux/actionCreators/auth"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

const token = localStorage.getItem("token")
if (token) {
  store.dispatch(loginUser(token))
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
)
