import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { signin } from "../actions/userActions";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "./SigninScreen.css";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //return query string if it does exist from props.location.search
  //split string by question mark and get the second value if it does not
  //exist return '/' which means home
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    //prevent form from refreshing the page
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    //if userInfo contains value it means that the login was successful
    //you need to redirect user to the redirect variable
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <div>
      <form className="signin__form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {/* if loading is true then show loadingbox and if error is true show messagebox */}
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

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

        <div className='login__button'>
          <label />
          <Button className="primary" type="submit">
            <h2>Sign In</h2>
          </Button>
        </div>

        <div>
          <label />
          <div>
            New customer?{" "}
            {/* this would pass the redirect to register */}
            <Link to={`/register?redirect${redirect}`}>
              Create your Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
