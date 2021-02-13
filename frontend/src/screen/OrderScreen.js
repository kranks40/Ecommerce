import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./OrderScreen.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder } from "../actions/orderActins";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

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
                  <strong>Name:</strong>
                  {order.ShippingAddress.fullName} <br />
                  <strong>Address:</strong>
                  {order.ShippingAddress.address},{order.ShippingAddress.city},
                  {order.ShippingAddress.postalCode},
                  {order.ShippingAddress.country}
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
                  <strong>Method:</strong>
                  {order.paymentMethod}
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
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
