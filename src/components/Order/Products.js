import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  parentDiv: {
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
})

const ProductCard = (props) => {
  const classes = useStyles()
  const data = props.data
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
          <div className={classes.parentDiv}>
            {data.products.map((product) => (
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
                      fontWeight: "bold",
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
                      href={`https://www.lapcare.com/product/${product.productId.name}/${product.productId.sku}`}
                      style={{ textDecoration: "none", color: "inherit" }}>
                      {product.productId.name}
                    </a>
                  </p>
                </div>
                <div className={classes.productPriceDiv}>
                  <p>Price</p>
                  <p>{product.unitPrice}</p>
                </div>
                <div
                  className={classes.productQuanityDiv}
                  style={{ textAlign: "center" }}>
                  <p>Quantity</p>
                  <p style={{ fontWeight: "bold" }}>{product.quantity}</p>
                </div>
                <div className={classes.productTotalDiv}>
                  <p>Total</p>
                  <p>{product.unitPrice * product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductCard
