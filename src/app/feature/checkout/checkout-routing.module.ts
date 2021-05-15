import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckoutProductsComponent} from './checkout-products/checkout-products.component';
import { ShippingdetailsComponent } from './shippingdetails/shippingdetails.component';

const routes: Routes = [
    {
        path: '',
        component: CheckoutProductsComponent,
    },
    {
      path : 'shippingdetails',
      component: ShippingdetailsComponent,
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CheckoutRoutingModule { }
