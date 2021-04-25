import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

import Product from "../components/Product";
import "./HomeScreen.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { listTopSellers } from "../actions/userActions";
import { Link, useParams } from "react-router-dom";

function HomeScreen() {
  const { pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userTopSellerList = useSelector((state) => state.userTopSellerList);
  const {
    loading: loadingTopSeller,
    error: errorTopSeller,
    users: sellers,
  } = userTopSellerList;

  /*useEffect is run atfter your components is rendered. 
    It accepts two parameters, a function and an array */
  useEffect(() => {
    //the empty object means that we don't want all products filtered
    dispatch(
      listProducts({
        pageNumber,
      })
    );
    dispatch(listTopSellers());
  }, [dispatch, pageNumber]);

  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingTopSeller ? (
        <LoadingBox></LoadingBox>
      ) : errorTopSeller ? (
        <MessageBox variant="danger">{errorTopSeller}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel
            autoPlay={true}
            autoPlayInterval="1000"
            autoPlayDirection="ltr"
            fadeOutAnimation={true}
            mouseTrackingEnabled={true}
            disableAutoPlayOnAction={true}
            infiniteLoop={true}
          >
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>

      {/* if loading is true render loadingbox else if error exist render messagebox else render product list*/}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>

          <div className="row center pagination-home">
            {/* converting pages to link */}
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomeScreen;
