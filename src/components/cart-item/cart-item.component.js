import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <div className="name">{name}</div>
        <div className="price">
          {quantity} x ${price}
        </div>
      </div>
    </div>
  );
};
export default CartItem;
