import React from "react";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: "2rem",
  },
  heading: {
    fontSize: "2rem",

    textAlign: "center",
  },
  label: {
    fontSize: "1.3rem",
  },
  input: {
    width: "100%",
    minHeight: "1.3rem",
    fontSize: "1rem",
  },
  inputError: {
    color: "red",
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
      fontSize: "1rem",
      backgroundColor: "#000000",
      color: "#ffff",
      cursor: "pointer",
      border: "none",
      borderRadius: "0.1rem 0.1rem",
    },
  },
  button2: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxWidth: "50%",
      maxHeight: "3rem",
      minWidth: "50%",
      minHeight: "3rem",
      fontSize: "0.9rem",
      backgroundColor: "#000000",
      color: "#ffff",
      marginTop: "2rem",
    },
  },
  deletebutton: {
    "&:hover": {
      backgroundColor: "#bd1e34",
    },
    "&": {
      backgroundColor: "#a60d22",
      color: "#ffff",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const EditProducts = () => {
  return (
    <div>
      <div style={{ padding: "18px" }}>
        <Grid
          item
          container
          spacing={4}
          style={{ marginTop: "8px", boxSizing: "border-box" }}
          alignItems="stretch"
        >
          <CreateProduct />
          <DeleteProduct />
        </Grid>
      </div>
    </div>
  );
};

export default EditProducts;
