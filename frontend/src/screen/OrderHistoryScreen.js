import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import "./OrderHistoryScreen.css";
import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { orderList } from "../actions/orderActions";

function OrderHistoryScreen(props) {
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderList());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {/* if loading is true show loadingbox otherwise if there is an error show messagebox otherwise render table*/}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="dander">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{order.createdAt}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt : "No"}</td>
                <td>{order.isDelivered ? order.deliveredAt : "No"}</td>
                <td className="detail__button">
                  <Button
                    variant="contained"
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
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

export default OrderHistoryScreen;
