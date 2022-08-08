import React from "react"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MoreIcon from "@material-ui/icons/MoreVert"
import { withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LOGOUT_USER } from "../../redux/actionTypes/auth"
import favicon from "../../assets/favicon.png"
import {
  Avatar,
  Typography,
  Badge,
  withStyles,
  makeStyles,
  IconButton,
  Toolbar,
  MenuItem,
  Menu,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge)

const PrimarySearchAppBar = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.name)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleLogOut = () => {
    localStorage.clear("token")
    dispatch({
      type: LOGOUT_USER,
    })
    props.history.push("/login")
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={() => props.history.push("/profile")}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>My Account</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <Toolbar>
        <img
          src="https://lapcare.sgp1.digitaloceanspaces.com/lapcare-logo-u.png"
          width="200"
          alt="Lapcare"
        />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: "600", marginLeft: "7px" }}>
            Hi {user}
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot">
              <Avatar alt="Lapcare" src={favicon} />
            </StyledBadge>
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
export default withRouter(PrimarySearchAppBar)
