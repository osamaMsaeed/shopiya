import React from "react";
import clsx from "clsx";
import { Grid, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import OrderTable from "./OrderTable";

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

const Orders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.allOrders);

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
          <Grid item xs={12}>
            <Card style={{ padding: "20px" }}>
              <Typography className={classes.heading}>Orders</Typography>
              <OrderTable />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Orders;
