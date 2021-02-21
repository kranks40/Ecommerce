import React, { useEffect, useState } from "react";
import "./ProfileScreen.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import { Button } from "@material-ui/core";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  //getting user details from redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="profile__form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="dander">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={user.name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={user.email}
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className='profile__button'>
              <label>
                <Button className="primary" type="submit">
                  Update
                </Button>
              </label>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;
