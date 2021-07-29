const getOrders = (res) => {
  return {
    type: "GET_ORDERS",
    res,
  };
};

export { getOrders };
