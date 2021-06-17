export default interface Product {
	imported: boolean,
	name: string,
	price: number,
    quantity: number,
    idx: number,
	type: string,
    taxedPrice: number,
    tax: number,
}
