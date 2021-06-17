import Product from '../types/Product';

// Preprocess the tax values and add ids to the catalog data

export const findTax = (price: number, percent: number) => {
    // Because we all love how JavaScript handles numbers
    // In reality I doubt I would leave so many comments here
    const rawTax : number = ( price / 100 ) * percent; // Find the raw tax amount based on %
    let fixedNumber : number = Number(rawTax.toFixed(2)); // Convert it to a number with 2 decimals points
    let cents : number = fixedNumber % 1 // Find the change
    fixedNumber -= cents; // Remove the change from the total
    cents = Number((cents * 100).toFixed(0)); // Convert change to a whole number
    let singleDigit = (cents % 10) // Find the ones digit from the change
    let remainder = 0 // Assume wont be adding anything if the number is 0
    if(singleDigit !== 0){
        remainder = singleDigit < 5 ? 5 : 10; // If greater than zero round to nearest 5 or 10
    }
    cents -= singleDigit // Remove the original ones digit
    cents += remainder; // Add 0, 5 or 10
    const tax = (fixedNumber + cents / 100); // Find the total tax amount
    const taxedPrice = Number((price + tax).toFixed(2)); // Add the total tax amount to the price
    return {
        taxedPrice,
        tax
    }
}

export const checkIfSalesTaxExempt = (type: string) => {
    // Check if item is in a sales tax exempt categrory
    return (type === 'food' || type === "medical" || type == "book");
}

export const processProducts = (data: any) => {
    data.reduce((accumulator: Product[], product: Product, currentIndex: number) => {
        let newProduct = product;
        const { imported, price, type } = newProduct;
        const taxExempt = checkIfSalesTaxExempt(type);
        let taxRate = 0;

        if(!taxExempt){
            taxRate += 10;
        }

        if(imported === true){
            taxRate += 5;
        }

        const { taxedPrice, tax } = findTax(price, taxRate);
        
        newProduct.taxExempt = taxExempt;
        newProduct.taxRate = taxRate;
        newProduct.taxedPrice = taxedPrice;
        newProduct.tax = tax;
        newProduct.quantity = 0;
        newProduct.id = `product_id_${currentIndex}`;

        accumulator.push(newProduct);
        return accumulator
    }, [])

    return data;

}

export default processProducts;