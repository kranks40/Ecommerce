import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checkout from "../components/Checkout";
import "./PlaceOrderScreen.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { createOrder } from "../actions/orderActins";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  //num.tofixed convert number to string data then Number converts the srting to integer
  const toPrice = (num) => Number(num.toFixed(2));
  //To calculate price item in the cart use reduce function to calculate the sum of the cart items
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  //To calculate shipping price you need to check if cart.item price is greater than 100 then use toPrice to zero otherwise use toPrice to 10 dollars
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.shippingPrice + cart.itemsPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // e.preventDefault();
    //use all fields of cart object and replace cartItems with orderItems
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    //if success is true the order created was successful then redirect user to order details screen then reset the basket to empty
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <Checkout step1 step2 step3 step4></Checkout>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="placeOrder">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {cart.ShippingAddress.fullName} <br />
                  <strong>Address:</strong>
                  {cart.ShippingAddress.address},{cart.ShippingAddress.city},
                  {cart.ShippingAddress.postalCode},
                  {cart.ShippingAddress.country}
                </p>
              </div>
            </li>

            <li>
              <div className="placeOrder">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>

            <li>
              <div className="placeOrder">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="placeOrder">
            <ul>
              <li>
                <h2>Order Summuray</h2>
              </li>
              <li>
                <div className="row">
                  <div>Item</div>
                  <div> ${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div> ${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax</div>
                  <div> ${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <div>
                <li className="order__button">
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    className="primary block"
                    disabled={cart.cartItems.length === 0}
                  >
                    <h1>Place Order</h1>
                  </Button>
                </li>
              </div>
                {/* check if loading is true then rednder loadingbox component. check error and if exist render messagebox component */}
                {loading && <LoadingBox />}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
