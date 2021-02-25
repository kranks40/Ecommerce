import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../node_modules/@material-ui/core/index";
import { listProducts } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "./ProductListScreen.css";

function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const deleteHandler = () => {};

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Catergory</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.Name}</td>
                <td>{product.Price}</td>
                <td>{product.Catergory}</td>
                <td>{product.Brand}</td>
                <td>
                  <Button
                    type="button"
                    className="small-edit"
                    onClick={() =>
                      props.history.push(`/products/${product._id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                </td>

                <td>
                <Button
                    type="button"
                    className="small-delete"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListScreen;
