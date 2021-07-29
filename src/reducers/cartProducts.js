const cartProductsReducer = (state = [], action) => {
  const products = state;
  let cartItems = [...products];
  const cartItem = action.res;

  const cartItemsSelected = cartItems.filter((c) => c.id === cartItem.id);

  switch (action.type) {
    case "PRODUCT_INCREMENT":
      if (cartItemsSelected.length) {
        const tempQuantity = cartItemsSelected[0].quantity;
        cartItemsSelected[0] = { ...cartItem };
        cartItemsSelected[0].quantity = tempQuantity + 1;

        cartItemsSelected[0].price =
          cartItemsSelected[0].quantity *
          +cartItemsSelected[0].subtitle.slice(1);
        cartItemsSelected[0].price =
          "$" + cartItemsSelected[0].price.toFixed(2);
        const cartDuplicateDelete = cartItems.filter(
          (c) => c.id !== cartItem.id
        );
        cartItems = [...cartItemsSelected, ...cartDuplicateDelete];
        return cartItems;
      } else {
        const newCartItem = [];
        newCartItem[0] = { ...cartItem };
        newCartItem[0].quantity = 1;
        newCartItem[0].price = newCartItem[0].subtitle;
        cartItems = [...newCartItem, ...cartItems];
        return cartItems;
      }

    case "PRODUCT_DECREMENT":
      const tempQuantity = cartItemsSelected[0].quantity;
      cartItemsSelected[0] = { ...cartItem };
      cartItemsSelected[0].quantity = tempQuantity - 1;

      cartItemsSelected[0].price =
        cartItemsSelected[0].quantity * +cartItemsSelected[0].subtitle.slice(1);
      cartItemsSelected[0].price = "$" + cartItemsSelected[0].price.toFixed(2);

      const cartDuplicateDelete = cartItems.filter((c) => c.id !== cartItem.id);
      cartItems = [...cartItemsSelected, ...cartDuplicateDelete];
      return cartItems;

    case "PRODUCT_DELETE":
      cartItems = cartItems.filter((c) => c.id !== cartItem.id);
      return cartItems;

    default:
      return state;
  }
};

export default cartProductsReducer;
