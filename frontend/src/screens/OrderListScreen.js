import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderListScreen = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const deleteHandler = (order) => {
    // if (window.confirm('Are you sure to delete?')) {
    // }
    //TODO: delete handler
  };

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id} </td>
                <td>{order.user.name} </td>
                <td>{order.createdAt.substring(0, 10)} </td>
                <td>{order.totalPrice.toFixed(2)} </td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'} </td>
                <td>{order.isDelivered ? order.isDeliveredAt.substring(0, 10) : 'No'} </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}>
                    Details
                  </button>
                  <button type="button" className="small" onClick={deleteHandler(order)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListScreen;
