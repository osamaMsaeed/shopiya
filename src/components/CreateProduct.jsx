import React from "react";
import { useStyles } from "./EditProducts";
import { Grid, Typography, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../actions/createProduct";

const CreateProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    subtitle: "",
    imgSrc: "",
    description: "",
  });
  const [inputOk, setInputOk] = useState(true);
  const [message, setMessage] = useState("");
  const [imgError, setImgError] = useState(null);
  const imgTypes = ["image/png", "image/jpeg"];
  const imgRef = useRef();

  const handleChange = (e) => {
    let obj = {};
    if (e.target.name == "imgSrc") {
      let selectedImg = e.target.files[0];

      if (selectedImg && imgTypes.includes(selectedImg.type)) {
        obj = { [e.target.name]: selectedImg };
        setImgError("");
      } else {
        obj = { [e.target.name]: null };
        setImgError("Please select an image file (png or jpeg)");
      }
    } else {
      obj = { [e.target.name]: e.target.value };
    }
    setState({ ...state, ...obj });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const product = { ...state, subtitle: "$" + state.subtitle };
    setInputOk(
      validateInput(product.title) && validateInput(product.description)
    );

    let ok =
      validateInput(product.title) &&
      validateInput(product.description) &&
      !imgError;

    if (ok) {
      dispatch(createProduct(product));
      setState({
        title: "",
        subtitle: "",
        imgSrc: "",
        description: "",
      });
      imgRef.current.value = "";

      let timerId = setTimeout(() => {
        setMessage("Product created successfully");
      }, 2000);
    }
  };

  const validateInput = (text) => {
    if (text.trim() === "" || text === null) {
      return false;
    }
    return true;
  };

  return (
    <Grid item xs={12} md={8}>
      <Card style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Create Product</Typography>
          {!inputOk ? <Alert severity="error">Incorrect Input</Alert> : null}
          {imgError && <Alert severity="error">{imgError}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
        </Grid>
        <Grid item xs={12} className={classes.form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid item container xs={12} className={classes.credential}>
              <Grid item xs={12} md={4}>
                <label htmlFor="productName">
                  <Typography className={classes.label}>
                    Product Name:
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={12} md={8}>
                <input
                  type="text"
                  name="title"
                  id="productName"
                  className={classes.input}
                  required
                  autoComplete="off"
                  value={state.title}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} className={classes.credential}>
              <Grid item xs={12} md={4}>
                <label htmlFor="price">
                  <Typography className={classes.label}>Price: </Typography>
                </label>
              </Grid>
              <Grid item xs={12} md={8}>
                <input
                  type="text"
                  name="subtitle"
                  id="price"
                  className={classes.input}
                  required
                  autoComplete="off"
                  pattern="^[1-9][0-9]*(\.[0-9]{1,2})?$"
                  title="price should be like 10.00 or 10"
                  placeholder="$"
                  value={state.subtitle}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} className={classes.credential}>
              <Grid item xs={12} md={4}>
                <label htmlFor="imgSrc">
                  <Typography className={classes.label}>Image URL: </Typography>
                </label>
              </Grid>
              <Grid item xs={12} md={8}>
                <input
                  type="file"
                  name="imgSrc"
                  id="imgSrc"
                  className={classes.input}
                  required
                  ref={imgRef}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} className={classes.credential}>
              <Grid item xs={12} md={4}>
                <label htmlFor="description">
                  <Typography className={classes.label}>
                    Description:{" "}
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={12} md={8}>
                <textarea
                  name="description"
                  id="description"
                  className={classes.input}
                  rows="10"
                  required
                  style={{ resize: "none" }}
                  value={state.description}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <input
                type="submit"
                value="CREATE PRODUCT"
                className={classes.button}
              />
            </Grid>
          </form>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CreateProduct;
