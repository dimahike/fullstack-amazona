import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers.js';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers.js';
import {
  productCreateReduser,
  productDeleteReduser,
  productDetailsReducer,
  productListReducer,
  productUpdateReduser,
} from './reducers/productReducers.js';
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers.js';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? localStorage.getItem('shippingAddress')
      : {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReduser,
  productUpdate: productUpdateReduser,
  productDelete: productDeleteReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
