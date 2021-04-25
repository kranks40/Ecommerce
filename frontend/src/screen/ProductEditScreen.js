import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../node_modules/@material-ui/core/index";
import Axios from "axios";

import { detailsProduct, updateProduct } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import "./ProductEditScreen.css";

function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    //if product does not exsit or if product exist and it's id is not equal to it's productId dispatch detailsproduct again
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setCategory(product.category);
      setImage(product.image);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, productId, product, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="edit__form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Prduct {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                placeholder="Enter Category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                placeholder="Enter Image"
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="imagefile">Image File</label>
              <input
                type="file"
                id="imagefile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{errorUpload}</MessageBox>}
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                type="number"
                id="countInStock"
                placeholder="Enter Stock Amount"
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="Enter Brand"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                rows="3"
                id="description"
                placeholder="Enter Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="update__button">
              <label>
                <Button className="primary" type="submit">
                  <h2>Update</h2>
                </Button>
              </label>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProductEditScreen;
