import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';

import { CartRoutingModule } from './cart-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CartPageComponent],
  exports: [CartPageComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    TranslateModule
  ]
})
export class CartModule { }
