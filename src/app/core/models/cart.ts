import {Product} from './product';
export class Cart
{
    total: number;
    data: [{
      product: Product,
      numInCart: number
    }];
}
