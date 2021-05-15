import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-products',
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.css']
})
export class CheckoutProductsComponent implements OnInit {
  checkoutProducts: Cart;
  checkoutTotal: number;
  constructor(private cartService: CartService) {
   }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.checkoutProducts = data);
    this.cartService.cartTotal$.subscribe(total => this.checkoutTotal = total);
  }

}
