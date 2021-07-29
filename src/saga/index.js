import { all, call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { rrfPropss } from "../index";
import { rrfProps, db, projectStorage } from "../config/fbConfig";
import "firebase/database";
import { getProducts } from "../actions/allProducts";
import { getOrders } from "../actions/allOrders";
import { productDelete } from "../actions/cartProducts";

function* fetchProducts() {
  //yield console.log('fetchProducts saga');
  try {
    /*  const result = yield axios(
      "https://60b7727817d1dc0017b8a01f.mockapi.io/products"
    ); */

    let result = [];
    const firedata = yield db
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();
    yield firedata.docs.forEach((doc) => {
      result = [...result, { ...doc.data(), id: doc.id }];
    });

    yield put(getProducts(result));
  } catch (err) {
    yield console.log(err);
  }
}

function* watchFetchProducts() {
  yield call(fetchProducts);
}

function* createProduct(action) {
  //yield console.log("create Products saga");
  try {
    const storageRef = projectStorage.ref(action.res.imgSrc.name);

    yield storageRef.put(action.res.imgSrc).on(
      "state_changed",
      (snap) => {},
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        const product = {
          ...action.res,
          imgSrc: url,
          avatarSrc: url,
          createdAt: new Date(),
        };
        await db.collection("products").add(product);
        console.log("product created success");
      }
    );
    yield call(fetchProducts);
  } catch (err) {
    yield console.log(err);
  }
}

function* watchCreateProduct() {
  yield takeLatest("CREATE_PRODUCT", createProduct);
}

function* deleteProduct(action) {
  //yield console.log("delete product saga");
  try {
    const productId = action.res;
    yield db.collection("products").doc(productId).delete();

    const cartProducts = yield select((state) => state.cartProducts);
    const deletedProduct = cartProducts.filter((prd) => prd.id == productId)[0];

    yield call(fetchProducts);
    yield put(productDelete(deletedProduct));
  } catch (err) {
    yield console.log(err);
  }
}

function* watchDeleteProduct() {
  yield takeLatest("DELETE_PRODUCT", deleteProduct);
}

function* placeOrder(action) {
  //yield console.log("place order saga");
  try {
    const order = {
      ...action.res,
      createdAt: new Date(),
      status: "processing",
    };
    const ref = yield db.collection("orders").add(order);
    let orderID = ref.id.match(/\d/g);
    orderID = orderID.join("");
    yield ref.update({ orderID });
    const cartProducts = yield select((state) => state.cartProducts);
    for (let item of cartProducts) {
      yield put(productDelete(item));
    }
  } catch (err) {
    yield console.log(err);
  }
}

function* watchPlaceOrder() {
  yield takeLatest("PLACE_ORDER", placeOrder);
}

function* fetchOrders() {
  //yield console.log("fetch orders saga");

  try {
    let result = [];
    const firedata = yield db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    yield firedata.docs.forEach((doc) => {
      result = [...result, { ...doc.data() }];
    });

    yield put(getOrders(result));
  } catch (err) {
    yield console.log(err);
  }
}

function* watchFetchOrders() {
  yield call(fetchOrders);
}

function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchCreateProduct(),
    watchDeleteProduct(),
    watchPlaceOrder(),
    watchFetchOrders(),
  ]);
}

export default rootSaga;
