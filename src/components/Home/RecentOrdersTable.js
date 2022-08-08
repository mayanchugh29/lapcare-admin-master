import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"

const RecentOrdersTable = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }} align="center">
        Recent Orders
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          color: "#555",
          minHeight: "450px",
          border: "1px solid #e5e5e5",
        }}
        elevation={0}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Order Id</Typography>
              </TableCell>
              <TableCell>
                <Typography>Customer</Typography>
              </TableCell>
              <TableCell>
                <Typography> Product name</Typography>
              </TableCell>
              <TableCell>
                <Typography>Quantity</Typography>
              </TableCell>
              <TableCell>
                <Typography>Total</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orders.slice(0, 10).map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>
                  {order.userId.fname + " " + order.userId.lname}
                </TableCell>
                <TableCell>{order.products[0].productId.name}</TableCell>
                <TableCell>{order.products[0].quantity}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default RecentOrdersTable
