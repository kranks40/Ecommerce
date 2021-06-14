import React from "react";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import ClampLines from "react-clamp-lines";

function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <ClampLines
            id="product._id"
            text={product.name}
            lines={1}
            ellipsis="..."
            moreText="Expand"
            lessText="Collapse"
            buttons={false}
          />
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>

        <div className="row">
          <div className="price">
            <Currency quantity={product.price} currency="XCD" />
          </div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
