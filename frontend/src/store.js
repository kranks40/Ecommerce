
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducers';

const initialState = {};


const reducer = combineReducers({
    productList: productListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS__EXTENTION__COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;