import React from "react";
import { Grid } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Content from "./components/Content";
import CartDrawer from "./components/CartDrawer";
import ItemAddedSnackbar from "./components/ItemAddedSnackbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/About";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import EditProducts from "./components/EditProducts";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProfileDrawer from "./components/ProfileDrawer";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Orders from "./components/Orders";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <ItemAddedSnackbar />
          <CartDrawer />
          <ProfileDrawer />

          <Header />

          <Grid container>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Switch>
                <Route exact path="/" component={Content} />
                <Route path="/about" component={About} />
                <Route path="/product/:id">
                  <ProductPage />
                </Route>
                <Route path="/checkout" component={Checkout} />

                <PrivateRoute path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute path="/orders" component={Orders} />
              </Switch>
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
          </Grid>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
