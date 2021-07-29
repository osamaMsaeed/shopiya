import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import itemAddedNotificationReducer from "./itemAddedNotification";
import panelReducer from "./panel";
import profilePanelReducer from "./profilePanel";
import cartProductsReducer from "./cartProducts";
import allProductsReducer from "./allProducts";
import allOrdersReducer from "./allOrders";

import { combineReducers } from "redux";

const persistConfig = {
  key: "cartProducts",
  storage: storage,
  whitelist: ["cartProducts"], // which reducer want to store
};

const rootReducer = combineReducers({
  allProducts: allProductsReducer,
  panel: panelReducer,
  profilePanel: profilePanelReducer,
  cartProducts: cartProductsReducer,
  itemAddedNotification: itemAddedNotificationReducer,
  allOrders: allOrdersReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
