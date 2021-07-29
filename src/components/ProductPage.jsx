import React from "react";
import ProductBio from "./ProductBio";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

const ProductPage = (props) => {
  const selectedProductId = useParams().id;
  const products = useSelector((state) => state.allProducts);
  const selectedProduct = products.filter(
    (prd) => prd.id == selectedProductId
  )[0];

  const checkProductExistence = (prd) => {
    return prd ? (
      <ProductBio id={selectedProductId} products={products} />
    ) : (
      <h1>No such product. Incorrect product address url</h1>
    );
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
        {products.length === 0 ? (
          <Spinner />
        ) : (
          checkProductExistence(selectedProduct)
        )}
      </Grid>
    </div>
  );
};

export default ProductPage;
