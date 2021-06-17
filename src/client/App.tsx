import * as React from 'react';
import { useState, useEffect } from 'react';
import data from './data/catalog';
import Card from './components/Card';
import CartListItem from './components/CartListItem';
import Product from './types/Product';
import { addtoCart, processCart, removeFromCart } from './services/manageCart';
import processProducts from './services/processProduct';
const catalog = processProducts(data);
// Move to common

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {

	const [cartList, updateCart] = useState([]);
	const [cartResponse, updateCartResponse] = useState({
        // total: 0,
        totalAfterTax: '0.00',
        totalTax: '0',
    });

	const addToCart = (product: Product) => {
		const { newList, response } = addtoCart(cartList, product);
		updateCart(newList);
		updateCartResponse(response);
	}

	const removeFromCartEvent = (product: Product, i: number) => {
		const { newList, response } = removeFromCart(cartList, product );
		updateCart(newList);
		updateCartResponse(response);
	}

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Everyday Essentials!</h1>
			<div className="row">
				<div className="col-12 col-lg-8">
					<ul className="card-group">
						{catalog && catalog.map((product: Product, i: number) =>
							<Card key={i} product={product} idx={i} addToCart={addToCart}></Card>
						)}
					</ul>
				</div>
				<div className="col-12 col-lg-4 floatRight">
					Cart
					<ul className="list-group">
					{cartList && cartList.length > 0 && cartList.map((product: Product, i: number) =>
						<CartListItem key={i + '_cart'} product={product} idx={i} removeFromCart={removeFromCartEvent}></CartListItem>
					)}

					{cartList && cartList.length === 0 && 
						<span>Cart is Empty</span>
					}

					</ul>
					Cart Total
					<ul className="cart-list">
						<li className="totalAfterTaxPrice"><label>Total</label> ${cartResponse.totalAfterTax}</li> 
						<li className="totalTax"><label>Tax</label> ${cartResponse.totalTax}</li>
					</ul>
				</div>
			</div>
		</main>
	);
};

interface AppProps {}

export default App;
