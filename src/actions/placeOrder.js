const placeOrder = (res) => {
  return {
    type: "PLACE_ORDER",
    res,
  };
};

export { placeOrder };
