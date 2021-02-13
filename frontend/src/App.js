import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";

import CartScreen from "./screen/CartScreen";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import SigninScreen from "./screen/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screen/RegisterScreen";
import ShippingAddressScreen from "./screen/ShippingAddressScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Ketoranks
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <ShoppingCartSharpIcon />
              {/* compare cartitem.length if it's greater than zero then render object */}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {/* if userInfo does exist then render username with a link */}
            {/* if userInfo does not exist then render signin link */}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">@2021 All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
