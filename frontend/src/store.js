import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisternReducer, userSigninReducer } from "./reducers/userReducers";

const initialState = {
  userSignin: {
    //check localstorage for userInfo, if it does exist then use JSON.parse
    //to convert it to userInfo object otherwise use null
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

/*redux thunk sends ajax request to redux action */

/*reducer is a function that accepts two parameters, state and action .
then it returns a new state */
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisternReducer,
});

/* createstore accepts reducer and initialstate */
const composeEnhancer = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
