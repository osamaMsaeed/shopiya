import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../actions/placeOrder";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  label: {
    fontSize: "1.3rem",
  },
  input: {
    width: "100%",
    minHeight: "1.3rem",
  },
  credential: {
    marginBottom: "2rem",
  },
  button: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxWidth: "100%",
      maxHeight: "3rem",
      minWidth: "100%",
      minHeight: "3rem",
      fontSize: "0.9rem",
      backgroundColor: "#000000",
      color: "#ffff",
    },
  },
  button2: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxWidth: "100%",
      maxHeight: "3rem",
      minWidth: "100%",
      minHeight: "3rem",
      fontSize: "0.9rem",
      backgroundColor: "#000000",
      color: "#ffff",
      marginTop: "2rem",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const formRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function ValidateNumber(strNumber) {
    var regExp = new RegExp("^\\d+$");
    var isValid = regExp.test(strNumber); // or just: /^\d+$/.test(strNumber);
    return isValid;
  }

  const validateInput = (text) => {
    if (text.trim() === "" || text === null) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (
      !validateInput(firstNameRef.current.value) ||
      !validateInput(lastNameRef.current.value) ||
      !validateInput(addressRef.current.value)
    ) {
      return setError("Please fill in required inforamtion");
    }
    if (!ValidateNumber(phoneRef.current.value)) {
      return setError("Incorrect phone number");
    }
    const orderDetails = {
      customerInfo: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
      },
      cartProducts: cartProducts,
    };
    dispatch(placeOrder(orderDetails));
    setMessage("Your order has been placed succesfully");

    formRef.current.reset();
  };

  return (
    <div style={{ padding: "18px" }}>
      <Grid
        item
        container
        spacing={4}
        style={{ marginTop: "8px", boxSizing: "border-box" }}
        alignItems="stretch"
      >
        <Grid item container xs={12}>
          {cartProducts.length === 0 ? (
            <Grid item container xs={12}>
              <Grid item xs={12}>
                {message ? (
                  <Alert severity="success" style={{ marginBottom: "1rem" }}>
                    {message}
                  </Alert>
                ) : (
                  <Alert severity="error" style={{ marginBottom: "1rem" }}>
                    Add items in the cart to checkout
                  </Alert>
                )}
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <Link to="/" className={classes.link}>
                    <Button className={classes.button2}>Go To Shop</Button>
                  </Link>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Card style={{ padding: "20px" }}>
                <Typography className={classes.heading}>Checkout</Typography>
                {error && (
                  <Alert severity="error" style={{ marginBottom: "1rem" }}>
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert severity="success" style={{ marginBottom: "1rem" }}>
                    {message}
                  </Alert>
                )}
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  ref={formRef}
                >
                  <Grid item container xs={12} className={classes.credential}>
                    <Grid item xs={12} sm={4}>
                      <label htmlFor="firstName">
                        <Typography className={classes.label}>
                          First Name:
                        </Typography>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className={classes.input}
                        required
                        autoComplete="off"
                        ref={firstNameRef}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.credential}>
                    <Grid item xs={12} sm={4}>
                      <label htmlFor="lastName">
                        <Typography className={classes.label}>
                          Last Name:{" "}
                        </Typography>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className={classes.input}
                        required
                        autoComplete="off"
                        ref={lastNameRef}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.credential}>
                    <Grid item xs={12} sm={4}>
                      <label htmlFor="email">
                        <Typography className={classes.label}>
                          E-mail:{" "}
                        </Typography>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={classes.input}
                        required
                        autoComplete="off"
                        ref={emailRef}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.credential}>
                    <Grid item xs={12} sm={4}>
                      <label htmlFor="phone">
                        <Typography className={classes.label}>
                          Phone:{" "}
                        </Typography>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className={classes.input}
                        required
                        autoComplete="off"
                        ref={phoneRef}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.credential}>
                    <Grid item xs={12} sm={4}>
                      <label htmlFor="address">
                        <Typography className={classes.label}>
                          Address:{" "}
                        </Typography>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className={classes.input}
                        required
                        autoComplete="off"
                        ref={addressRef}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" className={classes.button}>
                      Place Order
                    </Button>
                  </Grid>
                </form>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
