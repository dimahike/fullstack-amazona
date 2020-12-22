import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCard } from '../actions/cartActions';

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  console.log('cart screen', props.location.search);
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCard(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
};

export default CartScreen;
