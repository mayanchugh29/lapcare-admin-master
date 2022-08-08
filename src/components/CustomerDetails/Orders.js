import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "14px 0",
    padding: "12px",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  productParentDiv: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem",
    alignItems: "center",
    flexDirection: "column",
  },
  productDiv: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  productImageDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  productName: {
    width: "200px",
    overflow: "hiddden",
    textOverflow: "ellipsis",
    textDecoration: "none",
    color: "inherit",
  },
  orderIdContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "16px",
  },
  orderAmountContainer: {
    fontWeight: "600",
    fontSize: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
})

const Orders = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">Orders</Typography>
        {props.orders.map((order) => (
          <div className={classes.orderContainer}>
            <div className={classes.orderIdContainer}>
              <Link
                to={`/order/${order.orderId}`}
                style={{ textDecoration: "none", color: "#fcc101" }}>
                #{order.orderId}
              </Link>
              <p>{order.date.slice(0, 10)}</p>
            </div>
            <div className={classes.productParentDiv}>
              {order.products.map((product) => (
                <div key={product.productId.sku} className={classes.productDiv}>
                  <div className={classes.productImageDiv}>
                    <img
                      src={product.productId.images[0]}
                      height="80"
                      width="80"
                      alt="product"
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "12px",
                      }}>
                      <p>SKU : </p>
                      <p className={classes.productSku}>
                        {product.productId.sku}
                      </p>
                    </div>
                  </div>
                  <div className={classes.productNameDiv}>
                    <p className={classes.productName}>
                      <a
                        href={`https://www.lapcare.com/product/${product.productId.slug}/${product.productId.sku}`}
                        style={{ textDecoration: "none", color: "inherit" }}>
                        {product.productId.name}
                      </a>
                    </p>
                  </div>
                  <div className={classes.productPriceDiv}>
                    <p>Price</p>
                    <p>{product.productId.sellingPrice}</p>
                  </div>
                  <div
                    className={classes.productQuanityDiv}
                    style={{ textAlign: "center" }}>
                    <p>Quantity</p>
                    <p style={{ fontWeight: "bold" }}>{product.quantity}</p>
                  </div>
                  <div className={classes.productTotalDiv}>
                    <p>Total</p>
                    <p>{product.productId.sellingPrice * product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.orderAmountContainer}>
              <p>Order Amount</p>
              <p>{order.totalPrice}</p>
            </div>
            <Divider />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Orders
