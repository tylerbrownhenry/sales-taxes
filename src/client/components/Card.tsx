import * as React from "react";

const Card = (props: any) => {
  const { imported, name, price, type } = props.product;
  const { addToCart, idx } = props;
  return (
    <li className="card" key={idx}>
      <div className="card-body">
        <h5 className="card-title product-name">{name}</h5>
        <p className="card-text price">${price}</p>
        {imported && <p className="card-text">Imported</p>}
      </div>
      <div className="card-footer text-center">
        <a
          href="#"
          className="btn btn-primary"
          onClick={() => addToCart(props.product)}
        >
          Add To Cart
        </a>
      </div>
    </li>
  );
};

export default Card;
