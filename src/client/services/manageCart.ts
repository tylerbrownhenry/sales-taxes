import Product from '../types/Product';
export const processCart = (cartList: Product[], newItem : Product) => {
    let existInCart = false;

    let resp = {
        total: 0,
        totalAfterTax: 0,
        totalTax: 0,
        // productCount: 0,
        // tax: 0
    }
    
    const newList = cartList.reduce((accumulator, product, i) => {
        const { id, quantity, price, taxedPrice, tax } = product;
        product.idx = i;
        if(id === newItem.id){
            existInCart = true;
            quantity++;
            product.quantity = quantity;
        }
        resp.total += price * quantity,
        resp.totalAfterTax += taxedPrice * quantity,
        resp.totalTax += tax * quantity,
        accumulator.push(product);
    }, []);

    if(!existInCart){
        let { quantity, price, taxedPrice, tax } = newItem;
        quantity += 1;
        newItem.quantity = quantity;
        newItem.idx = cartList.length + 1;
        newList.push(newItem);
        resp.total += price * quantity;
        resp.totalAfterTax += taxedPrice * quantity;
        resp.totalTax += tax * quantity;
    }

    return { resp, newList };

}

export const addtoCart = (cartList, item) => processCart(cartList, item);

export const removeFromCart = (cartList: Product[], item : Product) => {
    cartList.splice(item.idx, 1);
    return processCart(cartList)
}


export default addtoCart;