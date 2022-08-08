import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { Typography, Grid, Button } from "@material-ui/core"

import DiscountCodeCard from "../components/Marketing/DiscountCodeCard"
import TypesCard from "../components/Marketing/TypesCard"
import ValueCard from "../components/Marketing/ValueCard"
import ApplyToCard from "../components/Marketing/ApplyToCard"
import UsageLimitCard from "../components/Marketing/UsageLimitCard"
import ActiveDateCard from "../components/Marketing/ActiveDateCard"
import CustomerEligibilityCard from "../components/Marketing/CustomerEligibilityCard"
import MinRequirementsCard from "../components/Marketing/MinRequirementsCard"

import request from "../axios/post"
import { useDispatch, connect } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  },
  page_content: {
    width: "90%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1rem .5rem",
  },
  buttons: {
    display: "inline-block",
  },
  cardTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "8px",
  },
})

const Discounts = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [code, setcode] = useState("")
  const [type, settype] = useState(1)
  const [discountValue, setdiscountValue] = useState(0)
  const [isProductSpecific, setisProductSpecific] = useState(false)
  const [isUserSpecific, setisUserSpecific] = useState(false)
  const [isCategorySpecific, setisCategorySpecific] = useState(false)
  const [categories, setcategories] = useState([])
  const [products, setproducts] = useState([])
  const [users, setusers] = useState([])
  const [validity, setvalidity] = useState({})
  const [limits, setlimits] = useState(null)
  const [limitToOneUser, setlimitToOneUser] = useState(false)
  const [minQuantity, setminQuantity] = useState(1)
  const [minAmount, setminAmount] = useState(1)

  const handleSubmit = async () => {
    const data = {
      code,
      type,
      discountValue,
      isProductSpecific,
      isUserSpecific,
      isCategorySpecific,
      products,
      categories,
      users,
      validity,
      limits,
      limitToOneUser,
      minQuantity,
      minAmount,
    }
    const response = await request("/coupons", data, props.token)
    if (response.status === 200) {
      props.history.push("/marketing/discounts")
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "New Discount Code created!",
          type: "success",
        },
      })
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "New Discount Code could not be created!",
          type: "error",
        },
      })
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.page_content}>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            Add New Discounts
          </Typography>
          <div className={classes.buttons}>
            <Button
              disableElevation
              variant="contained"
              onClick={handleSubmit}
              color="primary">
              Save
            </Button>
          </div>
        </div>

        <Grid style={{ marginTop: "10px" }} container spacing={4}>
          <Grid item xs={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <DiscountCodeCard code={code} setcode={setcode} />
              </Grid>
              <Grid item xs={12}>
                <TypesCard type={type} settype={settype} />
              </Grid>
              <Grid item xs={12}>
                <ValueCard
                  discountValue={discountValue}
                  setdiscountValue={setdiscountValue}
                />
              </Grid>
              <Grid item xs={12}>
                <ApplyToCard
                  isProductSpecific={isProductSpecific}
                  isCategorySpecific={isCategorySpecific}
                  products={products}
                  setproducts={setproducts}
                  categories={categories}
                  setcategories={setcategories}
                  setisCategorySpecific={setisCategorySpecific}
                  setisProductSpecific={setisProductSpecific}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomerEligibilityCard
                  isUserSpecific={isUserSpecific}
                  setisUserSpecific={setisUserSpecific}
                  users={users}
                  setusers={setusers}
                />
              </Grid>
              <Grid item xs={12}>
                <MinRequirementsCard
                  minAmount={minAmount}
                  minQuantity={minQuantity}
                  setminAmount={setminAmount}
                  setminQuantity={setminQuantity}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <UsageLimitCard
                  limits={limits}
                  setlimits={setlimits}
                  limitToOneUser={limitToOneUser}
                  setlimitToOneUser={setlimitToOneUser}
                />
              </Grid>
              <Grid item xs={12}>
                <ActiveDateCard validity={validity} setvalidity={setvalidity} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(Discounts))
