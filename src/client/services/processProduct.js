const findTax = (price, percent) => {
    const rawTax = ( price / 100 ) * 15; // convert price to whole number
    let fixedNumber = rawTax.toFixed(2);
    let cents = fixedNumber % 1
    fixedNumber -= cents;
    cents = (cents * 100).toFixed(0);
    let singleDigit = (cents % 10)
    let remainder = 0
    if(singleDigit !== 0){
        remainder = singleDigit < 5 ? 5 : 10;
    }
    cents -= singleDigit
    cents += remainder;
    const tax = (fixedNumber + cents / 100)
    const taxedPrice = (price + tax).toFixed(2);
    return {
        taxedPrice,
        tax
    }
}

const checkIfTaxExempt = (type) => {
    return (type === 'food' || type === "medical" || type == "book");
}

const processProducts = (data) => {
    data.reduce((accumulator, product, currentIndex, array) => {
        let newProduct = product;
        let price = newProduct.price;
        let taxExempt = checkIfTaxExempt(product.type);
        let taxAmount = 0;

        if(!taxExempt){
            taxAmount += 10;
        }

        if(product.imported === true){
            taxAmount += 5;
        }

        const { taxedPrice, tax } = findTax(price, taxAmount);
        newProduct.taxedPrice = taxedPrice;
        newProduct.tax = tax;

        accumulator.push(newProduct);
        return accumulator
    }, [])

    return data;

}



export default processProducts;