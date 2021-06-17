import Product from '../types/Product';
export const processCart = (cartList: any[], newItem: any, removing: boolean) => {
    let existInCart = false;

    let resp = {
        // total: 0,
        totalAfterTax: 0,
        totalTax: 0,
    }

    const newList = cartList.reduce((accumulator, product, i) => {
        let { id, quantity, price, taxedPrice, tax } = product;
        product.idx = i;
        let noneInCart = false;
        if(id === newItem.id){
            if(!removing){
                existInCart = true;
                quantity++;
                product.quantity = quantity;
            } else {
                existInCart = true;
                quantity--;
                product.quantity = quantity;
                if(quantity === 0){
                    noneInCart = true;
                }
            }

        }

        if(!noneInCart){
            // resp.total += price * quantity,
            resp.totalAfterTax += taxedPrice * quantity,
            resp.totalTax += tax * quantity,
            accumulator.push(product);
        }
        return accumulator;
    }, []);

    if(!existInCart && !removing){
        console.log('NOPE');
        let { quantity, price, taxedPrice, tax } = newItem;
        quantity = 1;
        newItem.quantity = quantity;
        newItem.idx = cartList.length + 1;
        newList.push(newItem);
        // resp.total += price * quantity;
        resp.totalAfterTax += taxedPrice * quantity;
        resp.totalTax += tax * quantity;
    }

    let response = {
        totalTax: resp.totalTax.toFixed(2),
        totalAfterTax: resp.totalAfterTax.toFixed(2)
    }

    return {response, newList };

}

export const addtoCart = (cartList: Product[], item: Product) => processCart(cartList, item, false);

export const removeFromCart = (cartList: Product[], item : Product) => {
    return processCart(cartList, item, true)
}

export default addtoCart;