import React from "react";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import { useStyles } from "./EditProducts";
import { Grid, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../actions/deleteProduct";

const DeleteProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  const [productSKU, setProductSKU] = useState("");
  const [inputOk, setInputOk] = useState(true);
  const [skuOk, setSkuOk] = useState(true);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProductSKU(e.target.value);
    setInputOk(validateInput(e.target.value));
    setSkuOk(validateSku(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setInputOk(validateInput(productSKU));
    setSkuOk(validateSku(productSKU));
    //console.log(Boolean(products.filter((prd) => prd.id == state).length));
    let ok = validateInput(productSKU) && validateSku(productSKU);
    if (ok) {
      dispatch(deleteProduct(productSKU));
      setProductSKU("");
      setMessage("Product deleted successfully");
    }
  };

  const validateInput = (text) => {
    if (text.trim() === "" || text === null) {
      return false;
    }
    return true;
  };

  const validateSku = (sku) => {
    if (!products.filter((prd) => prd.id == sku).length) {
      return false;
    }
    return true;
  };

  return (
    <Grid item xs={12} md={4}>
      <Card style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Delete Product</Typography>
          {!inputOk ? <Alert severity="error">Incorrect Input</Alert> : null}
          {/* {!skuOk ? (
            <Alert severity="error">SKU does not match to any product</Alert>
          ) : null} */}
          {message && <Alert severity="success">{message}</Alert>}
        </Grid>
        <Grid item xs={12} className={classes.form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid item container xs={12} className={classes.credential}>
              <Grid item xs={12}>
                <label htmlFor="productSKU">
                  <Typography className={classes.label}>
                    Product SKU:
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="text"
                  name="productSKU"
                  id="productSKU"
                  className={classes.input}
                  required
                  value={productSKU}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} className={classes.credential}>
              <Grid item xs={12}>
                <label htmlFor="productName">
                  <Typography className={classes.label}>
                    Product Name:
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={12}>
                <select
                  name="productName"
                  id="productName"
                  className={classes.input}
                  value={productSKU}
                  onChange={(e) => handleChange(e)}
                >
                  {products.length == 0 ? (
                    <option value="">No Products</option>
                  ) : (
                    <React.Fragment>
                      <option value="" disabled>
                        Select Product
                      </option>
                      {products.map((product) => (
                        <option value={product.id} key={product.id}>
                          {product.title}
                        </option>
                      ))}
                    </React.Fragment>
                  )}
                </select>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <input
                type="submit"
                value="DELETE PRODUCT"
                className={clsx(classes.button, classes.deletebutton)}
              />
            </Grid>
          </form>
        </Grid>
      </Card>
    </Grid>
  );
};

export default DeleteProduct;
