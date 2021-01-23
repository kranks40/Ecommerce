import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';

import CartScreen from './screen/CartScreen';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div>
            <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
            <Link to="/cart">
              <ShoppingCartSharpIcon />
             {/* compare cartitem.length if it's greater than zero then render object */}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
               )}
            </Link>
            <Link to="/signin">Sign In</Link>
        </div>
    </header>
    <main>
      <Route path ='/cart/:id?' component={CartScreen} />
      <Route path='/product/:id' component={ProductScreen}  />
      <Route path='/' component={HomeScreen} exact />      
    </main>
    <footer className="row center">@2021 All right reserved</footer>
</div>
</BrowserRouter>
  );
}

export default App;
