import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"
import { connect, useSelector, useDispatch } from "react-redux"
import { Button, FormControl, Typography } from "@material-ui/core"
import { Select } from "@material-ui/core"
import { MenuItem, Grid } from "@material-ui/core"
import ContactUs from "../components/Forms/ContactUs"
import Register from "../components/Forms/Register"
import Career from "../components/Forms/Career"
import Feedback from "../components/Forms/Feedback"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "90px",
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
})

const Forms = (props) => {
  const classes = useStyles()
  const [formType, setFormType] = useState(1)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const [fileName, setfileName] = useState("ContactUs")

  const handleChange = (event) => {
    setFormType(event.target.value)
    const form = event.target.value
    if (form === 1) {
      setfileName("ContactUs")
    }

    if (form === 2) {
      setfileName("ProductRegister")
    }

    if (form === 3) {
      setfileName("Career")
    }

    if (form === 4) {
      setfileName("Feedback")
    }
  }

  const renderForm = () => {
    if (formType === 1) {
      return <ContactUs />
    }

    if (formType === 2) {
      return <Register />
    }

    if (formType === 3) {
      return <Career />
    }

    if (formType === 4) {
      return <Feedback />
    }
  }

  const handleExport = async () => {
    const response = await request("/formData/export", token, {
      type: formType,
    })
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${fileName}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else {
      console.log(response)
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          msg: "Csv file could not be fetched!",
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
            Forms
          </Typography>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleExport}>
            Export
          </Button>
        </div>
        <FormControl>
          <Grid container>
            <Grid item xs={6}>
              <Select
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
                defaultValue={1}
                onChange={handleChange}
                variant="outlined">
                <MenuItem value={1}>Contact Us</MenuItem>
                <MenuItem value={2}>Register</MenuItem>
                <MenuItem value={3}>Career</MenuItem>
                <MenuItem value={4}>Feedback</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </FormControl>
        {renderForm()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(withRouter(Forms))
