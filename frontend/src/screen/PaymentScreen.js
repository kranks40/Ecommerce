//import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./PaymentScreen.css";
import { savePaymentMethod } from "../actions/cartActions";
import Checkout from "../components/Checkout";

function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { ShippingAddress } = cart;
  if (!ShippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("placeorder");
  };

  return (
    <div>
      <Checkout step1 step2 step3></Checkout>
      <form onSubmit={submitHandler} className="payment__form">
        <div>
          <h1>Payment Method</h1>
        </div>

        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;
