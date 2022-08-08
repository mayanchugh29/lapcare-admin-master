import React from "react"
import { Route, Switch, useLocation } from "react-router-dom"

import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./styles/theme"

import Home from "./screens/Home"
import Products from "./screens/Products"
import AddProduct from "./screens/AddProduct"
import Register from "./screens/Register"
import Login from "./screens/Login"

import ProtectedRoute from "./components/ProtectedRoutes/protectedRoutes"
import EditProduct from "./screens/EditProduct"
import Orders from "./screens/Orders"
import OrderDetails from "./screens/OrderDetails"
import Users from "./screens/Users"
import Shipments from "./screens/Shipments"
import CustomDrawer from "./components/common/drawer"
import Snackbar from "./components/common/Snackbar"
import ProductImages from "./screens/ProductImages"
import Categories from "./screens/Categories"
import AddNewCategory from "./screens/AddNewCategory"
import Forms from "./screens/Forms"
import EditCategory from "./screens/EditCategory"
import Discounts from "./screens/Discounts"
import AddNewDiscount from "./screens/AddNewDiscount"
import SendEmail from "./screens/SendEmail"
import AddNewOrder from "./screens/AddNewOrder"
import ShipmentDetails from "./screens/ShipmentDetails"
import AddNewUser from "./screens/AddNewUser"
import Dashboard from "./screens/Dashboard"
import CustomerDetails from "./screens/CustomerDetails"
import Refunds from "./screens/Refunds"
import AbandonedCarts from "./screens/AbandonedCarts"
import ReturnOrders from "./screens/ReturnRequests"
import ReturnDetails from "./screens/ReturnDetails"
import ServiceCenters from "./screens/ServiceCenters"

const App = () => {
  const location = useLocation()

  const showDrawer =
    location.pathname === "/login" ||
    location.pathname === "/register" ? null : (
      <CustomDrawer />
    )

  return (
    <div>
      <Snackbar />
      <ThemeProvider theme={theme}>
        {showDrawer}
        <Switch>
          <ProtectedRoute path="/products/new" element={AddProduct} />
          <ProtectedRoute path="/register" element={Register} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/send-email" element={SendEmail} />
          <ProtectedRoute
            path="/marketing/add-discount"
            element={AddNewDiscount}
          />
          <ProtectedRoute path="/marketing/discounts" element={Discounts} />
          <ProtectedRoute path="/products" element={Products} />
          <ProtectedRoute path="/profile" element={Dashboard} />
          <ProtectedRoute
            path="/product/categories/new"
            element={AddNewCategory}
          />
          <ProtectedRoute path="/product/categories" element={Categories} />
          <ProtectedRoute
            path="/product/category/edit"
            element={EditCategory}
          />
          <ProtectedRoute path="/product/images" element={ProductImages} />
          <ProtectedRoute path="/product/edit" element={EditProduct} />
          <ProtectedRoute path="/returns/:id" element={ReturnDetails} />
          <ProtectedRoute path="/returns" element={ReturnOrders} />
          <ProtectedRoute path="/orders" element={Orders} />
          <ProtectedRoute path="/order/add" element={AddNewOrder} />
          <ProtectedRoute path="/order/:id" element={OrderDetails} />
          <ProtectedRoute path="/customers/cart" element={AbandonedCarts} />
          <ProtectedRoute path="/customer/:id" element={CustomerDetails} />
          <ProtectedRoute path="/customers" element={Users} />
          <ProtectedRoute path="/users" element={Users} />
          <ProtectedRoute path="/user/add" element={AddNewUser} />
          <ProtectedRoute path="/forms" element={Forms} />
          <ProtectedRoute path="/shipments/:id" element={ShipmentDetails} />
          <ProtectedRoute path="/shipments" element={Shipments} />
          <ProtectedRoute path="/refunds" element={Refunds} />
          <ProtectedRoute path="/service-centers" element={ServiceCenters} />
          <ProtectedRoute path="/" element={Home} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
