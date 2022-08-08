import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import PersonIcon from "@material-ui/icons/Person"
import StorefrontIcon from "@material-ui/icons/Storefront"
import LocalShippingIcon from "@material-ui/icons/LocalShipping"

import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded"
import StoreRoundedIcon from "@material-ui/icons/StoreRounded"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import FormsIcon from "@material-ui/icons/Feedback"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import AppBarContent from "./appbar.js"
import { Link, withRouter } from "react-router-dom"
import { EmailSharp, HomeRounded } from "@material-ui/icons"
import LocalMallRoundedIcon from "@material-ui/icons/LocalMallRounded"

const drawerWidth = "250px"

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

function CustomDrawer(props) {
  const classes = useStyles()
  const [productsOpen, setProductsOpen] = React.useState(false)
  const [marketingOpen, setMarketingOpen] = React.useState(false)
  const [ordersOpen, setordersOpen] = React.useState(false)

  const handleProductsDrawerClick = () => {
    setProductsOpen(!productsOpen)
  }

  const handleMarketingDrawerClick = () => {
    setMarketingOpen(!marketingOpen)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <AppBarContent />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.list}>
            <Link
              to="/"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "inherit",
              }}>
              <ListItem button>
                <ListItemIcon>
                  <HomeRounded />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <ListItem button onClick={() => setordersOpen(!ordersOpen)}>
              <ListItemIcon>
                <LocalMallRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
              {ordersOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={ordersOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/orders"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="All Orders" />
                  </ListItem>
                </Link>
                <Link
                  to="/returns"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Returns" />
                  </ListItem>
                </Link>
                <Link
                  to="/refunds"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Razorpay Refunds" />
                  </ListItem>
                </Link>
                <Link
                  to="/order/add"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Add New Order" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Link
              to="/shipments"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "inherit",
              }}>
              <ListItem button>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Shipments" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleProductsDrawerClick}>
              <ListItemIcon>
                <LocalOfferRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {productsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={productsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/products"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="All Products" />
                  </ListItem>
                </Link>
                <Link
                  to="/products/new"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Add New" />
                  </ListItem>
                </Link>
                <Link
                  to="/product/images"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Upload Images" />
                  </ListItem>
                </Link>
                <Link
                  to="/product/categories"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Categories" />
                  </ListItem>
                </Link>
                <Link
                  to="/product/categories/new"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Add Category" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Link
              to="/users"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "inherit",
              }}>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
            <Link
              to="/forms"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "inherit",
              }}>
              <ListItem button>
                <ListItemIcon>
                  <FormsIcon />
                </ListItemIcon>
                <ListItemText primary="Forms" />
              </ListItem>
            </Link>
            <Link
              to="/send-email"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "inherit",
              }}>
              <ListItem button>
                <ListItemIcon>
                  <EmailSharp />
                </ListItemIcon>
                <ListItemText primary="Email" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleMarketingDrawerClick}>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary="Marketing" />
              {marketingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={marketingOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/marketing/discounts"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Discounts" />
                  </ListItem>
                </Link>
                <Link
                  to="/marketing/add-discount"
                  style={{
                    padding: "0",
                    textDecoration: "none",
                    color: "inherit",
                  }}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="Add New Discount" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Link
              to="/service-centers"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "inherit",
              }}>
              <ListItem button>
                <ListItemIcon>
                  <StoreRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Service Centers" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default withRouter(CustomDrawer)
