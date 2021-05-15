import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartDataServer: Cart = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<Cart>(this.cartDataServer);
  constructor(private productService: ProductService, private router: Router) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    const info: Cart = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.data[0].numInCart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataServer = info;
      this.CalculateTotal();
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      this.cartDataObs$.next({ ...this.cartDataServer });
    }

  }
  AddProductToCart(id: number, quantity?: number): void {
    let qty = 0;
    if (quantity != null) {
      qty = quantity;
    }
    else {
      qty = 1;
    }
    this.productService.getProductById(id).subscribe(prod => {
      // If the cart is empty
      if (prod.quantity - qty >= 0) {
        prod.quantity--;
        console.log(prod);
        if (this.cartDataServer.data[0].product === undefined) {
          this.cartDataServer.data[0].product = prod;
          this.cartDataServer.data[0].numInCart = qty;
          this.CalculateTotal();
          localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
          this.cartDataObs$.next({ ...this.cartDataServer });
        }  // END of IF
        // Cart is not empty
        else {
          const index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);

          // 1. If chosen product is already in cart array
          if (index !== -1) {
            // @ts-ignore
            if (qty === 1) {
              this.cartDataServer.data[index].numInCart = ++this.cartDataServer.data[index].numInCart;
            }
            else {
              this.cartDataServer.data[index].numInCart = qty;
            }
          }
          // 2. If chosen product is not in cart array
          else {
            this.cartDataServer.data.push({
              product: prod,
              numInCart: qty
            });
          }
          this.CalculateTotal();
          localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
          this.cartDataObs$.next({ ...this.cartDataServer });
        }  // END of ELSE
      }
    });
  }

  public CalculateTotal(): void {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const { numInCart } = p;
      let price: number;
      if (p.product !== undefined) {
        price = p.product.price;
      }
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  removeProductFromCart(index: number): void {
    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.CalculateTotal();

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }
  UpdateCartData(index, increase: boolean): void {
    const data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      this.cartDataServer.data[index].numInCart++;
      this.cartDataServer.data[index].numInCart = data.numInCart;
      this.CalculateTotal();
      this.cartDataServer.total = this.cartDataServer.total;
      this.cartDataObs$.next({ ...this.cartDataServer });
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.removeProductFromCart(index);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        // @ts-ignore
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataServer.data[index].numInCart = data.numInCart;
        this.CalculateTotal();
        this.cartDataServer.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      }

    }

  }

  CheckoutFromCart(): void {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({ ...this.cartDataServer });
    localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
    this.router.navigate(['/home/product']);
  }
}
