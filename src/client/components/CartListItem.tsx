import * as React from "react";

const CartListItem = (props: any) => {
  console.log(props);
  const {
    imported,
    name,
    price,
    type,
    taxedPrice,
    totalPrice,
    quantity,
    multiItemsPrice,
  } = props.product;
  const { removeFromCart, idx } = props;
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      key="{idx}"
    >

      {quantity === 1 && (
        <span className="totalPrice badge bg-primary rounded-pill">
          ${taxedPrice}
        </span>
      )}
      {quantity > 1 && (
        <span className="multiItemPrice badge bg-primary rounded-pill">
          {quantity} @ ${taxedPrice}
        </span>
      )}
      <span className="cartListName">{name}</span>
      <span
        onClick={() => removeFromCart(props.product, idx)}
        className="removeButton badge bg-danger"
      >
        X
      </span>
    </li>
  );
};

export default CartListItem;
