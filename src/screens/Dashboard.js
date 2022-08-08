import {
  Avatar,
  Button,
  Card,
  CardContent,
  makeStyles,
  Modal,
  Typography,
  TextField
} from "@material-ui/core"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { theme } from "../styles/theme"
import EmailRoundedIcon from "@material-ui/icons/EmailRounded"
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded"
import WorkRoundedIcon from "@material-ui/icons/WorkRounded"
import request from "../axios/put"
import { useDispatch } from "react-redux"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"

const useStyles = makeStyles({
  root: {
    marginTop: "90px",
    marginLeft: "250px",
    marginBottom: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75vh"
  },
  card: {
    width: "40%",
    padding: "1rem",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    alignItems: "center",
    borderRadius: "3px"
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "7px 0"
  },
  userInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e6e6e6",
    padding: "3px",
    fontSize: "16px"
  },
  parentContainer: {
    width: "100%",
    margin: "18px 0 7px 0"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: "24px 0 14px 0",
    width: "100%"
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20vw",
    padding: "7px 20px",
    outline: "none"
  },
  modalContent: {
    display: "flex",
    flexFlow: "column",
    margin: "7px 0",
    justifyContent: "center"
  }
})

const Dashboard = () => {
  const classes = useStyles()
  const { email, name, userRole, accountCreated } = useSelector(
    (state) => state.userReducer
  )
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token)
  const [open, setopen] = useState(false)
  const [action, setaction] = useState("")
  const [newEmail, setnewEmail] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [oldPassword, setoldPassword] = useState("")

  const handleEmailUpdate = async () => {
    if (newEmail.length > 0) {
      const response = await request("/user/email", { newEmail }, token)
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            open: true,
            msg: "Email Updated"
          }
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            open: true,
            msg: response.data
          }
        })
      }
    }
    setopen(false)
  }

  const handlePasswordUpdate = async () => {
    if (newPassword.length > 0) {
      const response = await request(
        "/user/password",
        { oldPassword, newPassword },
        token
      )
      if (response.status === 200) {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "success",
            open: true,
            msg: "Password Updated"
          }
        })
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            open: true,
            msg: response.data
          }
        })
      }
    }
    setopen(false)
  }

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <Avatar className={classes.large}></Avatar>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <div className={classes.parentContainer}>
          <div className={classes.userInfoContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                color: "grey"
              }}>
              <EmailRoundedIcon
                color="primary"
                style={{ marginRight: "5px", color: "grey" }}
              />
              <p>email</p>
            </div>
            <p>{email}</p>
          </div>
          <div className={classes.userInfoContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                color: "grey"
              }}>
              <WorkRoundedIcon
                color="primary"
                style={{ marginRight: "5px", color: "grey" }}
              />
              <p>access</p>
            </div>
            <p>{userRole}</p>
          </div>
          <div className={classes.userInfoContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                color: "grey"
              }}>
              <CheckCircleRoundedIcon
                color="primary"
                style={{ marginRight: "5px", color: "grey" }}
              />
              <p>joined</p>
            </div>
            <p>{accountCreated ? accountCreated.slice(0, 10) : null}</p>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              onClick={() => {
                setopen(true)
                setaction("email")
              }}>
              Change email
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                setopen(true)
                setaction("password")
              }}>
              Change Password
            </Button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setopen(false)}>
        <Card className={classes.modal}>
          <CardContent className={classes.modalContent}>
            <Typography variant="h6" align="center" gutterBottom>
              {action === "email" ? "Change Email" : "Change Password"}
            </Typography>
            {action === "email" ? (
              <div>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="old email"
                  value={email}
                  disabled
                  fullWidth
                  style={{ margin: "7px 0" }}
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="new email"
                  value={newEmail}
                  fullWidth
                  onChange={(e) => setnewEmail(e.target.value)}
                  style={{ margin: "7px 0" }}
                />
              </div>
            ) : (
              <div>
                <TextField
                  type="password"
                  variant="outlined"
                  color="primary"
                  label="current password"
                  value={oldPassword}
                  fullWidth
                  onChange={(e) => setoldPassword(e.target.value)}
                  style={{ margin: "7px 0" }}
                />
                <TextField
                  type="password"
                  variant="outlined"
                  color="primary"
                  label="new password"
                  value={newPassword}
                  fullWidth
                  onChange={(e) => setnewPassword(e.target.value)}
                  style={{ margin: "7px 0" }}
                />
              </div>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={
                action === "email" ? handleEmailUpdate : handlePasswordUpdate
              }
              disableElevation
              style={{ margin: "7px 0" }}>
              Update
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </div>
  )
}

export default Dashboard
