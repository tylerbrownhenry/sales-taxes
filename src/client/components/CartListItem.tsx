import * as React from 'react';

interface Product {
  imported: boolean,
  name: string,
  price: number,
  type: string,
}

// Set type of catalog item
const CartListItem = (props: any) => {
  console.log(props);
  const {imported, name, price, type, taxedPrice, totalPrice, quantity, multiItemsPrice } = props.product;
  const { removeFromCart, idx } = props;
  // Correct! There is no need to specify the key here:
  return <li className="list-group-item d-flex justify-content-between align-items-center" key="{idx}">
      <label>{name}</label>
      {quantity === 1 &&<span className="totalPrice badge bg-primary rounded-pill">${taxedPrice}</span>}
      {quantity > 1 && <span className="multiItemPrice badge bg-primary rounded-pill">{quantity} @ ${taxedPrice}</span>}
      <span onClick={() => removeFromCart(props.product, idx)} className="removeButton badge bg-danger">X</span>
      </li>
}

export default CartListItem;



