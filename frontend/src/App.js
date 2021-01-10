import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';

function App() {
  return (
    <BrowserRouter>
        <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="brand" href="/">ecommerce</a>
                    </div>
                    <div>
                        <a href="/cart">Cart</a>
                        <a href="/signin">Sign In</a>
                    </div>
                </header>
                <main>
                  <Route path='/product/:id' component={ProductScreen} />
                  <Route path='/' component={HomeScreen} exact />
                 
                </main>
                <footer className="row footer">
                    All right reserved
                </footer>
            </div>    
    </BrowserRouter>
  );
}

export default App;
