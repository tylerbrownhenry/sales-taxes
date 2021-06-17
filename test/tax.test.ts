import { strict as assert } from 'assert';
import { findTax, checkIfSalesTaxExempt, processProducts} from '../src/client/services/processProduct';

describe('services.processProduct.findTax', () => {
  it('should return correct taxPrice', () => {
    let resp = findTax(10,5)
    assert.equal(resp.taxedPrice, 10.50);
    assert.equal(resp.tax, 0.50);
  });

  it('should return correct taxPrice', () => {
    let resp = findTax(100,5)
    assert.equal(resp.taxedPrice, 105.00);
    assert.equal(resp.tax, 5.00);
  });

  it('should return correct taxPrice', () => {
    let resp = findTax(1000,5)
    assert.equal(resp.taxedPrice, 1050.00);
    assert.equal(resp.tax, 50.00);
  });

  it('should return correct taxPrice', () => {
    let resp = findTax(10000,5)
    assert.equal(resp.taxedPrice, 10500.00);
    assert.equal(resp.tax, 500.00);
  });

  it('should return correct taxPrice', () => {
    let resp = findTax(10004,5)
    assert.equal(resp.taxedPrice, 10504.20);
    assert.equal(resp.tax, 500.20);
  });

  it('should return correct taxPrice', () => {
    let resp = findTax(10004,5)
    assert.equal(resp.taxedPrice, 10504.20);
    assert.equal(resp.tax, 500.20);
  });

  it('should return correct 15% tax for imported bottle of perfume', () => {
    let resp = findTax(27.99,15)
    assert.equal(resp.taxedPrice, 32.19);
    assert.equal(resp.tax, 4.20);
  });

  it('should return correct 10% tax for a bottle of perfume', () => {
    let resp = findTax(18.99,10)
    assert.equal(resp.taxedPrice, 20.89);
    assert.equal(resp.tax, 1.90);
  });

  it('should return correct 5% tax for an imported box of chocolate', () => {
    let resp = findTax(11.25,5)
    assert.equal(resp.taxedPrice, 11.85);
    assert.equal(resp.tax, 0.60);
  });

  it('should return correct 5% tax for an imported box of chocolate', () => {
    let resp = findTax(10,5)
    assert.equal(resp.taxedPrice, 10.50);
    assert.equal(resp.tax, 0.50);
  });

  it('should return correct 15% tax for a bottle of perfume', () => {
    let resp = findTax(47.50,15)
    assert.equal(resp.taxedPrice, 54.65);
    assert.equal(resp.tax, 7.15);
  });

  it('should return correct 0% tax for a book', () => {
    let resp = findTax(12.49,0)
    assert.equal(resp.taxedPrice, 12.49);
    assert.equal(resp.tax, 0);
  });

  it('should return correct 10% tax for a cd', () => {
    let resp = findTax(14.99,10)
    assert.equal(resp.taxedPrice, 16.49);
    assert.equal(resp.tax, 1.50);
  });
});


describe('services.processProduct.checkIfSalesTaxExempt', () => {
  it('should return food as taxExempt', () => {
    let resp = checkIfSalesTaxExempt('food')
    assert.equal(resp, true);
  });

  it('should return book as taxExempt', () => {
    let resp = checkIfSalesTaxExempt('book')
    assert.equal(resp, true);
  });

  it('should return medicine as taxExempt', () => {
    let resp = checkIfSalesTaxExempt('medical')
    assert.equal(resp, true);
  });

  it('should not return music as taxExempt', () => {
    let resp = checkIfSalesTaxExempt('music')
    assert.equal(resp, false);
  });
});

// describe('services.processProduct.processProducts', () => {
//   it('should return correct taxedPrice and tax for an item', () => {
//     const resp =processProducts([
//       {
//         name: "Headache Medicine",
//         type: "medical",
//         imported: true,
//         price: 9.75
//     },
//     ])

//     assert.equal(resp, [{
//       id: 'product_id_0',
//       imported: true,
//       name: 'Headache Medicine',
//       price: 9.75,
//       quantity: 0,
//       tax: 0.5,
//       taxExempt: true,
//       taxRate: 5,
//       taxedPrice: 10.25,
//       type: 'medical'
//     }]);
//   });

//   it('should return correct taxedPrice and tax for an item', () => {
//     const resp = processProducts([
//       {
//         name: "The Black Album",
//         type: "music",
//         imported: false,
//         price: 10.49
//     },
//     ])
    
//     assert.equal(resp, [    {
//         id: 'product_id_0',
//         imported: false,
//         name: 'The Black Album',
//         price: 10.49,
//         quantity: 0,
//         tax: 1.1,
//         taxExempt: false,
//         taxRate: 10,
//         taxedPrice: 11.59,
//         type: "music",
//     }]);
//   });
// });
