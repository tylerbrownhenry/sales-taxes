

// INPUT 3
// 1 Imported bottle of perfume at 27.99
// 1 Bottle of perfume at 18.99
// 1 Packet of headache pills at 9.75
// 1 Imported box of chocolates at 11.25
// 1 Imported box of chocolates at 11.25

// OUTPUT 2
// Imported box of chocolates: 10.50
// Imported bottle of perfume: 54.65
// Sales Taxes: 7.65
// Total: 65.15

// OUTPUT 3
// Imported bottle of perfume: 32.19
// Bottle of perfume: 20.89
// Packet of headache pills: 9.75
// Imported box of chocolates: 23.70 (2 @ 11.85)
// Sales Taxes: 7.30
// Total: 86.53


import * as React from 'react';
import { useState, useEffect } from 'react';
import data from './data/catalog';
import Card from './components/Card';
import Container from './components/Container';
import CartListItem from './components/CartListItem';
import Product from './types/Product';


import { addtoCart, processCart, removeFromCart } from './services/manageCart';
// Move to common

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	const [cartList, updateCart] = useState([]);
	const [cartResponse, updateCartResponse] = useState({
        total: 0,
        totalAfterTax: 0,
        totalTax: 0,
        // productCount: 0,
        // tax: 0
    });

	const addToCart = (product: Product) => {
		console.log('product',cartList);
		// cartList.push(product);
		// newList.push(product);
		const { newList, resp } = addtoCart(cartList, product);
		updateCart(newList);
		updateCartResponse(resp);
	}

	const removeFromCart = (product: Product, i: number) => {
		console.log('product',cartList);
		// cartList.push(product);
		const { newList, resp } = removeFromCart(cartList, product);
		updateCart(newList);
		updateCartResponse(resp);
	}
	// const { value } = this.state;

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Hello!</h1>
			<div className="row">
				<div className="col-8">
					<div className="card-group">
						{data && data.map((product: Product, i: number) =>
							<Card product={product} key={i} addToCart={addToCart}></Card>
						)}
					</div>
				</div>
				<div className="col-4">
					Receipt {cartList.length}
					{cartList && cartList.map((product: Product, i: number) =>
						<CartListItem product={product} key={i} idx={i} removeFromCart={removeFromCart}></CartListItem>
					)}
					Totals:
					<div>{cartResponse.totalTax}</div>
				</div>
			</div>
		</main>
	);
};

interface AppProps {}

/* CLASS REACT EXAMPLE */
// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

export default App;
