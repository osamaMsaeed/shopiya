const productIncrement = (res) => {
  return {
    type: "PRODUCT_INCREMENT",
    res,
  };
};

const productDecrement = (res) => {
  return {
    type: "PRODUCT_DECREMENT",
    res,
  };
};

const productDelete = (res) => {
  return {
    type: "PRODUCT_DELETE",
    res,
  };
};

export { productIncrement, productDecrement, productDelete };
