import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import request from "../../axios/delete"
import { useDispatch, useSelector } from "react-redux"
import { SET_TOASTIFY } from "../../redux/actionTypes/toastify"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const RemoveCenterAlert = (props) => {
  const token = useSelector((state) => state.authReducer.token)
  const dispatch = useDispatch()

  const handleConfirm = async () => {
    const response = await request(`/service-centers/${props.data._id}`, token)
    if (response.status === 200) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          type: "success",
          msg: "Service center details removed!",
        },
      })
      props.setreloadDetails(true)
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          open: true,
          type: "error",
          msg: "Service center details could not be removed",
        },
      })
    }

    props.setOpen(false)
  }

  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogTitle id="alert-dialog-slide-title">
        Are you sure you want to remove {props.data.location} from Service
        Centers list?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          The {props.data.location} location will be removed permanently from
          the list of authorized service centers.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveCenterAlert
