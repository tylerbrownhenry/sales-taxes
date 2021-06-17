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
  const {imported, name, price, type, taxedPrice, totalPrice, count, multiItemsPrice } = props.product;
  const { removeFromCart, idx } = props;
  // Correct! There is no need to specify the key here:
  return <li key={props.key} onClick={() => removeFromCart(idx)}>
      <span>{name}</span>
      <span>{price}</span>
      <span>{totalPrice}</span>
      {count > 1 && <span>({count} @ {taxedPrice})</span>}
      </li>
}

export default CartListItem;



