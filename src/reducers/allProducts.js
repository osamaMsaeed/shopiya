const allProductsReducer = (state = [], action) => {
  if (action.type == "GET_PRODUCTS") {
    return [...action.res];
  }
  return state;
};

export default allProductsReducer;
