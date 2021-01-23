import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';


import  { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const initialState = {
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
});

/* createstore accepts reducer and initialstate */
const composeEnhancer = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store;