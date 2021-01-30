import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import './RegisterScreen.css';

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //return query string if it does exist from props.location.search
  //split string by question mark and get the second value if it does not
  //exist return '/' which means home
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    //prevent form from refreshing the page
    e.preventDefault();
    //if password is not equal to confirm password return error message
    //else return first code
    if (password !== confirmPassword) {
      alert('Password don"t match');
    } else {
    dispatch(register(name, email, password));
  }};

  useEffect(() => {
    //if userInfo contains value it means that the login was successful
    //you need to redirect user to the redirect variable
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <div>
      <form className="register__form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {/* if loading is true then show loadingbox and if error is true show messagebox */}
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <div className='register__button'>
          <label />
          <Button className="primary" type="submit">
            <h2>Register</h2>
          </Button>
        </div>

        <div>
          <label />
          <div>
            Already have an account ?{" "}
            {/* this would pass the redirect to the signin */}
            <Link to={`/signin?redirect${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
export default RegisterScreen;
