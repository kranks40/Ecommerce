import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";

import "./OrderScreen.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  detailsOrder,
  orderDelivered,
  payOrder,
} from "../actions/orderActions";
import Axios from "axios";
import {
  ORDER_DELIVERED_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { Button } from "../../../node_modules/@material-ui/core/index";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    //if order._id does not exist means the order is not loaded otherwise if order is paid is false
    //check to see if the papyal window is already loaded. If payapl window is not loaded then
    //call addPaypalScript function otherwise set sdkReady to true
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(orderDelivered(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="Order">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.ShippingAddress.fullName} <br />
                  <strong>Address:</strong> {order.ShippingAddress.address},{" "}
                  {order.ShippingAddress.city},{" "}
                  {order.ShippingAddress.postalCode},{" "}
                  {order.ShippingAddress.country}{" "}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="Order">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="Order">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
          <div className="Order">
            <ul>
              <li>
                <h2>Order Summuray</h2>
              </li>
              <li>
                <div className="row">
                  <div>Item</div>
                  <div> ${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div> ${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax</div>
                  <div> ${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div className="total">
                    <strong>Payment Total</strong>
                  </div>
                  <div className="total">
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {/* create a conditional rendering to check if order.ispaid is false 
              // then render a jsx element to check if sdkready is false therfore 
              // loadingbox would be rendered, otherwise show paypal button */}
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {/* if userInfo.isAdmin and order is paid and is not delivered render jsx */}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <Button type="button" className='primary block' onClick={deliverHandler}>
                    Deliver Order
                  </Button>
                </li>
              )}
              {}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
