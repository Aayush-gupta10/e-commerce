import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutProductsComponent } from './checkout-products/checkout-products.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ShippingdetailsComponent } from './shippingdetails/shippingdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CheckoutProductsComponent, ShippingdetailsComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [CheckoutRoutingModule]
})
export class CheckoutModule { }
