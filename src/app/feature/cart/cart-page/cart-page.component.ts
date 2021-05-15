import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartProducts: Cart;
  cartTotal: number;
  showDataNotFound = true;

  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Products to Cart';

  constructor(private cartService: CartService, translate: TranslateService) {
    }
    productsInCart: number;
  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => {
      this.cartProducts = data;
      this.cartProducts.data.forEach(ele =>
        {
          this.productsInCart = this.productsInCart + ele.numInCart;
        });
    });
    console.log(JSON.stringify(this.cartProducts));
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  removeCartProduct(index: number): void {
    this.cartService.removeProductFromCart(index);
  }
  ChangeQuantity(id , increaseQuantity): void
  {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

}
