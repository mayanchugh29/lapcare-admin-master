import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core"
import React from "react"

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
  dateContainer: {
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

const Cart = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">Cart</Typography>
        {props.data.map((cartItem) => (
          <div>
            <div className={classes.dateContainer}>
              <p>Item added on:</p>
              <p>
                {new Date(cartItem.date).toLocaleString("en-GB", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>
            <div className={classes.productParentDiv}>
              <div key={cartItem.product.sku} className={classes.productDiv}>
                <div className={classes.productImageDiv}>
                  <img
                    src={cartItem.product.images[0]}
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
                    <p className={classes.productSku}>{cartItem.product.sku}</p>
                  </div>
                </div>
                <div className={classes.productNameDiv}>
                  <p className={classes.productName}>
                    <a
                      href={`https://www.lapcare.com/product/${cartItem.product.slug}/${cartItem.product.sku}`}
                      style={{ textDecoration: "none", color: "inherit" }}>
                      {cartItem.product.name}
                    </a>
                  </p>
                </div>
                <div className={classes.productPriceDiv}>
                  <p>Price</p>
                  <p>{cartItem.product.sellingPrice}</p>
                </div>
                <div
                  className={classes.productQuanityDiv}
                  style={{ textAlign: "center" }}>
                  <p>Quantity</p>
                  <p style={{ fontWeight: "bold" }}>{cartItem.quantity}</p>
                </div>
                <div className={classes.productTotalDiv}>
                  <p>Total</p>
                  <p>{cartItem.product.sellingPrice * cartItem.quantity}</p>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Cart
