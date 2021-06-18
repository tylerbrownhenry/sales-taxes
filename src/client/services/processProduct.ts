import Product from '../types/Product';

export const findTax = (price: number, percent: number) => {
    // Because we all love how JavaScript handles numbers

    // In reality I doubt I would leave so many comments here

    // Find the raw tax amount based on %
    // Convert it to a number with 2 decimals points
    // Find the change
    // Remove the change from the total
    // Convert change to a whole number
    // Find the ones digit from the change
    // Assume wont be adding anything if the number is 0
    // If greater than zero round to nearest 5 or 10
    // Remove the original ones digit
    // Add 0, 5 or 10
    // Find the total tax amount
    // Add the total tax amount to the price

    const rawTax: number = (price / 100) * percent;
    let fixedNumber: number = Number(rawTax.toFixed(2));
    let cents: number = fixedNumber % 1;
    fixedNumber -= cents;
    cents = Number((cents * 100).toFixed(0));
    let singleDigit = cents % 10;
    let remainder = 0;
    if (singleDigit !== 0) {
        remainder = singleDigit < 5 ? 5 : 10;
    }
    cents -= singleDigit;
    cents += remainder;
    const tax = fixedNumber + cents / 100;
    const taxedPrice = Number((price + tax).toFixed(2));
    return {
        taxedPrice,
        tax,
    };
};

export const checkIfSalesTaxExempt = (type: string) => {
    // Check if item is in a sales tax exempt categrory
    return type === 'food' || type === 'medical' || type == 'book';
};

export const processProducts = (data: any) => {
    // Preprocess the tax values and add ids to the catalog data
    // In real world wouldn't do it like this
    data.reduce((accumulator: Product[], product: Product, currentIndex: number) => {
        let newProduct = product;
        const { imported, price, type } = newProduct;
        const taxExempt = checkIfSalesTaxExempt(type);
        let taxRate = 0;

        if (!taxExempt) {
            taxRate += 10;
        }

        if (imported === true) {
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
        return accumulator;
    }, []);

    return data;
};

export default processProducts;
