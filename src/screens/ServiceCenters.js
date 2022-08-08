import React, { useState, useEffect, useRef } from "react"
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core"
import request from "../axios/get"
import { SET_TOASTIFY } from "../redux/actionTypes/toastify"
import { useDispatch, useSelector } from "react-redux"
import Autocomplete from "@material-ui/lab/Autocomplete"
import EditRoundedIcon from "@material-ui/icons/EditRounded"
import DeleteForever from "@material-ui/icons/DeleteForever"
import AddNewCenter from "../components/ServiceCenters/AddNewCenter"
import RemoveCenterAlert from "../components/ServiceCenters/RemoveCenterAlert"

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
  branchCard: {
    minHeight: "210px",
    borderTop: "2px solid #fcc101",
    boxShadow:
      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
    padding: "10px",
  },

  addressText: {
    margin: "10px 0",
    fontSize: "1rem",
  },
})

const ServiceCenters = () => {
  const classes = useStyles()
  const [showBranch, setShowBranch] = useState(titleCase("search your city"))
  const [openModal, setopenModal] = useState(false)
  const dispatch = useDispatch()
  const [serviceCenters, setServiceCenters] = useState([])
  const [selectedCenter, setselectedCenter] = useState(null)
  const [openRemoveAlert, setopenRemoveAlert] = useState(false)
  const initialData = useRef(null)
  const token = useSelector((state) => state.authReducer.token)
  const [reloadDetails, setreloadDetails] = useState(false)
  const [mode, setmode] = useState("")

  useEffect(() => {
    const getServiceCenters = async () => {
      const response = await request("/service-centers", token)
      if (response.status === 200) {
        setServiceCenters(response.data.data)
        initialData.current = response.data.data
        setreloadDetails(false)
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            type: "error",
            msg: "Service centers could not be fetched",
            open: true,
          },
        })
      }
    }
    getServiceCenters()
  }, [dispatch, token, reloadDetails])

  const selectServiceCenters = (value) => {
    setShowBranch(titleCase(value))
    if (value === "showall" || value === null) {
      setServiceCenters(initialData.current)
    } else {
      let selectedBranches = initialData.current.filter(
        (branch) => branch.location === value
      )
      setServiceCenters(selectedBranches)
    }
  }

  function titleCase(string) {
    return string ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ""
  }

  const locations = serviceCenters.map((branch) => branch.location)
  locations.sort((a, b) => a.localeCompare(b))

  return (
    <>
      <AddNewCenter
        open={openModal}
        setopen={setopenModal}
        data={selectedCenter}
        mode={mode}
        setreloadDetails={setreloadDetails}
      />
      {selectedCenter && (
        <RemoveCenterAlert
          open={openRemoveAlert}
          setOpen={setopenRemoveAlert}
          data={selectedCenter}
          setreloadDetails={setreloadDetails}
        />
      )}

      <div className={classes.root}>
        <div className={classes.page_content}>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              Service centers
            </Typography>

            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setmode("add")
                setopenModal(true)
              }}
              disableElevation>
              Add New Center
            </Button>
          </div>
          <div className={classes.location_filter}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={4} className={classes.location_filter_r}>
                <Autocomplete
                  id="branch-select"
                  options={locations}
                  getOptionLabel={(option) => titleCase(option)}
                  value={showBranch}
                  onChange={(event, newValue) => {
                    selectServiceCenters(newValue)
                  }}
                  style={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Branch"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>
          <Grid spacing={3} container className={classes.branchList}>
            {serviceCenters.map((branch) => (
              <Grid key={branch._id} item xs={12} sm={6} md={4}>
                <div className={classes.branchCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Typography
                      style={{ marginBottom: "10px", fontWeight: 600 }}
                      className={classes.addressText}>
                      {branch.name}
                    </Typography>
                    <div>
                      <EditRoundedIcon
                        style={{ cursor: "pointer" }}
                        color="primary"
                        onClick={() => {
                          setselectedCenter(branch)
                          setmode("edit")
                          setopenModal(true)
                        }}
                      />
                      <DeleteForever
                        style={{ marginLeft: "7px", cursor: "pointer" }}
                        color="primary"
                        onClick={() => {
                          setselectedCenter(branch)
                          setopenRemoveAlert(true)
                        }}
                      />
                    </div>
                  </div>
                  <Typography
                    style={{ marginBottom: "10px" }}
                    className={classes.addressText}>
                    {branch.address}
                  </Typography>
                  <Typography className={classes.addressText}>
                    <span style={{ fontWeight: "500" }}>Contact : </span>{" "}
                    {branch.contact}
                  </Typography>
                  <Typography className={classes.addressText}>
                    <span style={{ fontWeight: "500" }}>Email : </span>{" "}
                    {branch.email}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default ServiceCenters
