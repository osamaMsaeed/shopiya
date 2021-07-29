import React from "react";
import CoffeeCard from "./CoffeeCard";
import Spinner from "./Spinner";
import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

const Content = (props) => {
  const products = useSelector((state) => state.allProducts);

  const getCoffeeMakerCard = (coffeeMakerObj) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        style={{ display: "flex", position: "relative" }}
        key={coffeeMakerObj.id}
      >
        <CoffeeCard {...coffeeMakerObj} />
      </Grid>
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
          products.map((coffeeMakerObj) => getCoffeeMakerCard(coffeeMakerObj))
        )}
      </Grid>
    </div>
  );
};

export default Content;
