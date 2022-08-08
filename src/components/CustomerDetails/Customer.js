import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "14px 0",
    padding: "12px",
  },
  stats_parent_dev: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "7px",
  },
  child_div: {
    textAlign: "center",
  },
})

const Customer = (props) => {
  const classes = useStyles()
  const [totalSpentAmount, settotalSpentAmount] = useState(0)
  const [aveargeOrderVlaue, setaveargeOrderVlaue] = useState(0)
  useEffect(() => {
    let amount = 0
    props.data.orders.forEach((order) => {
      amount += order.totalPrice
    })
    settotalSpentAmount(amount)
    setaveargeOrderVlaue(Math.round(amount / props.data.orders.length))
  }, [props.data.orders])
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" gutterBottom style={{ fontWeight: "600" }}>
          {props.data.fname + " " + props.data.lname}
        </Typography>
        <p>
          Customer since{" "}
          {new Date(props.data.date).toLocaleString("en-GB", {
            timeZone: "Asia/Kolkata",
          })}
        </p>
        <div className={classes.stats_parent_dev}>
          <div className={classes.child_div}>
            <p style={{ color: "grey" }}>Last Order</p>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>
              {props.data.orders.length > 0
                ? props.data.orders[props.data.orders.length - 1].date.slice(
                    0,
                    10
                  )
                : null}
            </p>
          </div>
          <div className={classes.child_div}>
            <p style={{ color: "grey" }}>Total spent to date</p>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>
              {totalSpentAmount}
            </p>
          </div>
          <div className={classes.child_div}>
            <p style={{ color: "grey" }}>Average order value</p>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>
              {aveargeOrderVlaue}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Customer
