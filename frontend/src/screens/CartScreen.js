import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCard } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  console.log('cart screen', props.location.search);
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  // const cartItems = [];

  console.log('cartItems', cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCard(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
  };

  const checkoutHandler = () => {
    props.history.push('/signinn?redirect=shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={`http://localhost:3000/${item.image}`}
                      alt={item.name}
                      className="small"
                    />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name} </Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCard(item.product, Number(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>$ {item.price}</div>
                  <div>
                    <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}{' '}
              </h2>
            </li>
            <li>
              <button
                typ="buttom"
                onClick={checkoutHandler}
                className="primary block"
                disable={cartItems.length === 0}>
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;