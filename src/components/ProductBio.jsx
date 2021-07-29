import React from "react";
import { Grid, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { productIncrement } from "../actions/cartProducts";
import { itemAdded } from "../actions/itemAddedNotification";

const useStyles = makeStyles((theme) => ({
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
}));

const ProductBio = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id, products } = props;
  const selectedProduct = products.filter((prd) => prd.id == id)[0];
  const { title, subtitle, description, imgSrc, avatarSrc } = selectedProduct;

  const incrementItem = () => {
    const item = { id, title, subtitle, avatarSrc };
    dispatch(productIncrement(item));
    dispatch(itemAdded(true));
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
        <Grid item sm={12} md={8}>
          <div>
            <img src={imgSrc} style={{ width: "100%" }} />
          </div>
        </Grid>
        <Grid item sm={12} md={4} className="productContent">
          <h1>{title}</h1>

          <Divider />

          <h3>{subtitle}</h3>

          <p>{description}</p>
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flexGrow: 0.8 }}>
              <h3>quantity</h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexGrow: 0.6,
              }}
            >
              <IconButton>
                <AddIcon fontSize="large" style={{ cursor: "pointer" }} />
              </IconButton>

              <div>1</div>
              <IconButton>
                <RemoveIcon fontSize="large" style={{ cursor: "pointer" }} />
              </IconButton>
            </div>
          </div> */}
          <Button
            size="large"
            variant="outlined"
            className={classes.button}
            onClick={() => incrementItem()}
          >
            Add To Cart
          </Button>
          {/* <Button
            size="large"
            variant="outlined"
            className={classes.button}
            style={{ marginTop: "2rem" }}
            onClick={() => dispatch(createProduct(true))}
          >
            Create Product
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductBio;
