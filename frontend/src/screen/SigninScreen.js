import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { Button } from "@material-ui/core";

import './SigninScreen.css';


function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        //prevent form from refreshing the page
        e.preventDefault();
    }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
            <label />
            <Button className='primary' type='submit'>Sign In</Button>
        </div>

        <div>
            <label />
            <div>New customer? {' '}
                <Link to='/register'>Create your Account</Link>
            </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
