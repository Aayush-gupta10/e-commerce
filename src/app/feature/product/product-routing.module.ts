import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListResolver } from 'src/app/core/resolver/product-list.resolver';
import { ProductResolver } from 'src/app/core/resolver/product.resolver';


const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        resolve: {
          productList: ProductListResolver
        }
      },
      {
        path: 'productDetails/:productID',
        component: ProductDetailComponent,
        resolve: {
          productList: ProductResolver
        }
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
