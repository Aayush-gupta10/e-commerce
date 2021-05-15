import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './feature/authentication/login/login.component';
import {AuthGuard} from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('./feature/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        loadChildren: () => import('./feature/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        loadChildren: () => import('./feature/checkout/checkout.module').then(m => m.CheckoutModule)
      },
    ]
  },
  {
    path : 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
