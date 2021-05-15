import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductModule } from '../product/product.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CartModule } from '../cart/cart.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ProductModule,
    CartModule
  ],
  exports : [
    DashboardComponent
  ]
})
export class DashboardModule { }
