import { strict as assert } from 'assert';
import { processCart } from '../src/client/services/manageCart';

describe('services.manageCart.processCart', () => {
  it('adding to cart should return list of items and totals', () => {
    
    const newItem = {
            id: "product_id_12",
            idx: 1,
            imported: false,
            name: "The Black Album",
            price: 10.49,
            quantity: 1,
            tax: 1.1,
            taxExempt: false,
            taxRate: 10,
            taxedPrice: 11.59,
            type: "music"
        };

    const resp = processCart([], newItem, false);

    assert.deepStrictEqual(resp,  {
        newList: [
            {
                id: 'product_id_12',
                imported: false,
                name: 'The Black Album',
                price: 10.49,
                quantity: 1,
                tax: 1.1,
                taxExempt: false,
                taxRate: 10,
                taxedPrice: 11.59,
                type: 'music',
                idx: 1,
            }
        ],
        response: {
            totalAfterTax: "11.59",
            totalTax: "1.10"
        }
    });
});

describe('services.manageCart.processCart', () => {
    it('removing from cart should return list of items and totals', () => {

        const newItem = {
            id: "product_id_12",
            idx: 1,
            imported: false,
            name: "The Black Album",
            price: 10.49,
            quantity: 1,
            tax: 1.1,
            taxExempt: false,
            taxRate: 10,
            taxedPrice: 11.59,
            type: "music"
        };

        const resp = processCart([], newItem, false);
        let removedResp = processCart(resp.newList, newItem, true);

        assert.deepStrictEqual(removedResp,  {
            newList: [],
            response: {
                totalAfterTax: "0.00",
                totalTax: "0.00"
            }
        });
    });
});

describe('services.manageCart.processCart', () => {
    it('adding more than one item should increase the quantity of the product', () => {

        const newItem = {
            id: "product_id_12",
            idx: 1,
            imported: false,
            name: "The Black Album",
            price: 10.49,
            quantity: 1,
            tax: 1.1,
            taxExempt: false,
            taxRate: 10,
            taxedPrice: 11.59,
            type: "music"
        };
        
        const resp = processCart([], newItem, false);
        let add3 = processCart(resp.newList, newItem, false);
        add3 = processCart(add3.newList, newItem, false);
        add3 = processCart(add3.newList, newItem, false);

        assert.deepStrictEqual(add3,  {
            newList: [
                {
                    id: 'product_id_12',
                    imported: false,
                    name: 'The Black Album',
                    price: 10.49,
                    quantity: 4,
                    tax: 1.1,
                    taxExempt: false,
                    taxRate: 10,
                    taxedPrice: 11.59,
                    type: 'music',
                    idx: 0,
                }
            ],
            response: {
                totalAfterTax: "46.36",
                totalTax: "4.40"
            }
            });
        });
    });
});