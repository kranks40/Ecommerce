import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import './ProductScreen.css'

function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId))

    }, [dispatch, productId]);
    
    return (
        <div>
        {/* if loading is true render loadingbox 
        else if error exist render messagebox else render product list*/}
        {loading ? ( 
        <LoadingBox></LoadingBox>
        ) : error ? (
             <MessageBox variant='danger'>{error}</MessageBox>
        ) :  (             
            <div>
            <Link to='/'>Back</Link>
            <div className="row top">
                <div className="col-2">
                    <img className='large' src={product.image} alt={product.name} ></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating  rating={product.rating} numReviews={product.numReviews}/>
                        </li>
                        <li>
                            Price : ${product.price}
                        </li>
                        <li>
                            Description : <p>{product.description}</p> 
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="buy">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className='price'>${product.price}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div className='status'>
                                        {product.countInStock > 0 ? (
                                        <span className='success'>In Stock</span>
                                         ) : (
                                        <span className="danger">Unavailable</span>
                                         )}
                                    </div>
                                </div>
                            </li>

                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )}
        </div>
          
    );
}

export default ProductScreen;
