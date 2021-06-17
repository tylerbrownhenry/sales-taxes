export default interface Product {
  imported: boolean;
  name: string;
  price: number;
  quantity: number;
  idx: number;
  id: string;
  type: string;
  taxedPrice: number;
  tax: number;
  taxRate: number;
  taxExempt: boolean;
}
