import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Avatar,
  IconButton,
  Grid,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CancelIcon from "@material-ui/icons/Cancel";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import {
  productIncrement,
  productDecrement,
  productDelete,
} from "../actions/cartProducts";
import { setCartPanel } from "../actions/panel";

const useStyles = makeStyles({
  list: {
    width: 430,
  },
  mobileList: {
    width: "16em",
  },
  emptyList: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  button: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxHeight: "6em",
      minWidth: "100%",
      minHeight: "2em",
      fontSize: "1rem",
      backgroundColor: "#000000",
      color: "#ffff",
    },
  },
  link: {
    width: "100%",
    color: "#ffff",
    textDecoration: "none",
  },
});

export default function CartDrawer(props) {
  const dispatch = useDispatch();

  const matches = useMediaQuery("(min-width:600px)");

  const anchor = "panel";

  const cartItems = useSelector((state) => state.cartProducts);

  const classes = useStyles();

  const calcTotalPrice = () => {
    if (cartItems.length !== 0) {
      let total = cartItems.reduce(
        (sum, current) => sum + +current.price.slice(1),
        0
      );
      total = +total.toFixed(2);
      return `$${total}`;
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(
        cartItems.length
          ? matches
            ? classes.list
            : classes.mobileList
          : classes.emptyList,
        {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        }
      )}
      role="presentation"
    >
      <List>
        {cartItems.length === 0 ? (
          <Typography variant="h6">No items in cart</Typography>
        ) : null}
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Grid container direction="column">
              <Grid item container>
                <ListItemIcon>
                  <Avatar src={item.avatarSrc} alt="itempic">
                    R
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                />

                <ListItemText primary={item.subtitle} />
                <ListItemText primary={"Total: " + item.price} />
              </Grid>
              <Grid item container>
                <ListItemText
                  primary={
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        dispatch(productIncrement(item));
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  }
                />
                <ListItemText primary={item.quantity} />
                <ListItemText
                  primary={
                    <IconButton
                      aria-label="remove"
                      disabled={item.quantity <= 1}
                      onClick={() => {
                        dispatch(productDecrement(item));
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                  }
                />
                <ListItemText
                  primary={
                    <IconButton
                      aria-label="cancel"
                      onClick={() => {
                        dispatch(productDelete(item));
                      }}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <Divider />
        {cartItems.length !== 0 ? (
          <div>
            <ListItem>
              <ListItemText primary={"Total Cost = " + calcTotalPrice()} />
            </ListItem>
            <ListItem>
              <Link to="/checkout" className={classes.link}>
                <Button
                  className={classes.button}
                  onClick={() => {
                    dispatch(setCartPanel(false));
                  }}
                >
                  Checkout
                </Button>
              </Link>
            </ListItem>
          </div>
        ) : null}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor="right"
          open={useSelector((state) => state.panel)}
          onClose={() => {
            dispatch(setCartPanel(false));
          }}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
