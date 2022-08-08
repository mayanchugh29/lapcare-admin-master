import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button } from "@material-ui/core"
import request from "../../axios/put"
import { useSelector, useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    margin: "10px 0",
  },
  formControl: {
    margin: "14px 0",
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
  cardTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

const ReturnAction = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)

  const status = [
    {
      statusId: 2,
      status: "Return Approved",
    },
    {
      statusId: 3,
      status: "Return Rejected",
    },
  ]

  const handleSubmit = async (param) => {
    const data = {
      statusId: status[param].statusId,
      status: status[param].status,
      returnId: props.data._id,
    }
    const response = await request("/return/returnStatus", data, token)
    if (response.status === 200) {
      props.setcurrentOrderStatus((prev) => [
        ...prev,
        { status: status[param].status },
      ])
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "Return Status Updated!",
          open: true,
          type: "success",
        },
      })
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: `${response.data}`,
          open: true,
          type: "error",
        },
      })
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Return Action
        </Typography>
        {props.currentOrderStatus[props.currentOrderStatus.length - 1]
          .status === "Return Approved" ||
        props.currentOrderStatus[props.currentOrderStatus.length - 1].status ===
          "Return Rejected" ? (
          <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
            Current Return Status :{" "}
            {
              props.currentOrderStatus[props.currentOrderStatus.length - 1]
                .status
            }
          </Typography>
        ) : (
          <div>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: "10px 0" }}
              fullWidth
              onClick={() => handleSubmit(0)}>
              Accept Return Request
            </Button>
            <Button
              type="outlined"
              color="primary"
              fullWidth
              variant="outlined"
              style={{ margin: "10px 0" }}
              onClick={() => handleSubmit(1)}>
              Reject Return Request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ReturnAction
