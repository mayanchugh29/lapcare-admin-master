import React, { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"
import request from "../../axios/get"
import {
  Card,
  CardActions,
  Modal,
  Typography,
  makeStyles,
  Button,
  CardContent,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30vw",
    padding: "7px 20px",
    outline: "none",
  },
  title: {
    textAlign: "center",
    fontWeight: "medium",
    fontSize: "1.3rem",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "4px",
  },
  value: {
    border: "1px solid #777",
    padding: "4px",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "14px",
  },
})

const options = [
  {
    name: "Today",
    value: 1,
  },
  {
    name: "Last day",
    value: 2,
  },
  {
    name: "Current month",
    value: 3,
  },
  {
    name: "Last 3 months",
    value: 4,
  },
  {
    name: "All time",
    value: 5,
  },
]

const ExportModal = (props) => {
  const [selectedOption, setselectedOption] = useState(5)
  const dispatch = useDispatch()
  const classes = useStyles()

  const renderOptions = () => {
    return options.map((option) => (
      <FormControlLabel
        key={option.value}
        value={option.value}
        control={<Radio checked={option.value == selectedOption} />}
        label={option.name}
      />
    ))
  }

  const handleClose = () => {
    props.setopenExportModal(false)
  }

  const handleExportOrders = async () => {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        open: true,
        msg: "Your file will start downloading soon!",
        type: "info",
      },
    })
    const response = await request("/orders/export", props.token, {
      type: selectedOption,
    })
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "orders.csv")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else {
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
    <Modal open={props.openExportModal} onClose={handleClose}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {" "}
            Export Orders
          </Typography>
          <FormControl>
            <RadioGroup
              name="Date Range"
              value={props.type}
              onChange={(e) => setselectedOption(e.target.value)}>
              {renderOptions()}
            </RadioGroup>
          </FormControl>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={handleExportOrders}
              fullWidth>
              Download
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(ExportModal)
