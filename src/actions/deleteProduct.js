const deleteProduct = (res) => {
  return {
    type: "DELETE_PRODUCT",
    res,
  };
};

export { deleteProduct };
