const allOrdersReducer = (state = [], action) => {
  if (action.type == "GET_ORDERS") {
    return [...action.res];
  }
  return state;
};

export default allOrdersReducer;
