import React, { useEffect } from 'react';

import Product from '../components/Product';
import './HomeScreen.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';



function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    /*useEffect is run atfter your components is rendered. 
    It accepts two parameters, a function and an array */
    useEffect(() => {
           dispatch(listProducts())
    }, [dispatch]);
    

    return (
        <div>
            {/* if loading is true render loadingbox else if error exist render messagebox else render product list*/}
            {loading ? ( 
            <LoadingBox></LoadingBox>
            ) : error ? (
                 <MessageBox variant='danger'>{error}</MessageBox>
            ) :  ( 
            <div className="row center">
                {/* products here is being used from the backend */}
            { products.map((product) => (
            <Product key={product._id} product={product} />
            ))}
            </div>

            )}
        </div>
    )
};

export default HomeScreen;
