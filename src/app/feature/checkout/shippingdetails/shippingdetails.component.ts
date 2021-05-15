import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shippingdetails',
  templateUrl: './shippingdetails.component.html',
  styleUrls: ['./shippingdetails.component.css']
})
export class ShippingdetailsComponent implements OnInit {

  shippingform = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    zipcode: new FormControl('' , [Validators.required , Validators.pattern('[0-9]{6}')]),
    telephone: new FormControl('' , [Validators.required ,  Validators.pattern('[0-9]{10}')]),
  });

  products: Product[];

  checkoutProducts: Cart;
  checkoutTotal: number;


  constructor(
    // authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.checkoutProducts = data);
    this.cartService.cartTotal$.subscribe(total => this.checkoutTotal = total);
    if (this.checkoutProducts?.data[0].numInCart === 0)
    {
      this.router.navigateByUrl('/home/product');
    }
  }
  onSubmit(): void
  {
    console.log(this.shippingform.value);
  }

  orderPlaced(): void
  {
    this.cartService.CheckoutFromCart();
  }

  getControlValidationClasses(control: AbstractControl): object {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }
}
