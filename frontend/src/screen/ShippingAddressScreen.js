//import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

import Checkout from "../components/Checkout";
import "./ShippingAddressScreen.css";

function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { ShippingAddress } = cart;

  const [lat, setLat] = useState(ShippingAddress.lat);
  const [lng, setLng] = useState(ShippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  //if userInfo does not exist then redirect user to sign in screen
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(ShippingAddress.fullName);
  const [address, setAddress] = useState(ShippingAddress.address);
  const [city, setCity] = useState(ShippingAddress.city);
  const [postalCode, setPostalCode] = useState(ShippingAddress.postalCode);
  const [country, setCountry] = useState(ShippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    //check the address map, if it exist then use it, otherwise use current lat and lng
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    //if addressmap exist set latitude and longitude based on them
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    //if newlat and newlng does not exist show user a message
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your current location on map. Continue?"
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div>
      <Checkout step1 step2></Checkout>
      <form className="shipping__form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>

        <div>
          <label htmlFor="fullName">Full Name (First and Last name)</label>
          <input
            type="text"
            id="fullName"
            autoCapitalize="words"
            autoCorrect='true'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            autoCapitalize='words'
            autoCorrect='true'
            placeholder="Street address or P.O. Box"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></input>

          {/* <input
            className="address"
            type="text"
            placeholder="Apt, suite, unit, building, floor, etc."
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></input> */}
        </div>

        <div className="city">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            autoCapitalize='words'
            autoCorrect='true'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>

        <div className="postalcode">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="country">Country/Region</label>
          <input
            type="text"
            id="country"
            autoCapitalize='words'
            autoCorrect='true'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose on Map
          </button>
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

export default ShippingAddressScreen;
