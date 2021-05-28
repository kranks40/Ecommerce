import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../../node_modules/@material-ui/core/index";

import { deleteOrders, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import "./OrderListScreen.css";

function OrderListScreen(props) {
  const { pageNumber = 1 } = useParams();
  //the orderListScreen should be specified for seller by checking for a path match and if it's greater or equal to zero it would be true
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    //sellerMode is used here by setting seller equal to sellermode and if it's true then put the curent userId otherwise put empty string
    dispatch(
      listOrders({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [dispatch, sellerMode, successDelete, userInfo._id, pageNumber]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure you want to delete order?"))
      dispatch(deleteOrders(order._id));
  };

  return (
    <div>
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {/* if loading is true show loadingbox otherwise if there is an error show messagebox otherwise render table*/}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="dander">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid
                      ? order.paidAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.toString().substring(0, 10)
                      : "No"}
                  </td>
                  <td className="row__button">
                    <Button
                      variant="contained"
                      type="button"
                      className="small-detail"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>

                    <Button
                      variant="contained"
                      type="button"
                      className="small-delete"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row center pagination">
            {/* converting pages to link */}
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/orderlist/pageNumber/${x + 1}`}
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

export default OrderListScreen;
