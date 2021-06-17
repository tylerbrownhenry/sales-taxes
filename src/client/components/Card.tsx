import * as React from 'react';

interface Product {
  imported: boolean,
  name: string,
  price: number,
  type: string,
}

// Set type of catalog item
const Card = (props: any) => {
  console.log(props);
  const { imported, name, price, type } = props.product;
  const { addToCart, key } = props;
  // Correct! There is no need to specify the key here:
  return <div className="card" key={key}>
  <div className="card-body">
    <h5 className="card-title product-name">{name}</h5>
    <p className="card-text price">${price}</p>
    {imported && <p className="card-text">Imported</p>}
  </div>
  <div className="card-footer text-center">
      <a href="#" className="btn btn-primary" onClick={() => props.addToCart(props.product)}>Add To Cart</a>
    </div>
</div>}

export default Card;



