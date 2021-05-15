import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})

export class ProductListResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService)
  {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productService.getProducts();
  }
}
