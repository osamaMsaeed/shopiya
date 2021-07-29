const createProduct = (res) => {
  return {
    type: "CREATE_PRODUCT",
    res,
  };
};

export { createProduct };
