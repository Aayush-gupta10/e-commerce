import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: Product;
  productList: Product[] = [];
  productData$ = new BehaviorSubject<Product[]>(this.productList);
  private PRODUCT_SERVICE_BASE_URL = '/assets/DataBase/';

  constructor(private readonly http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/productDB.json`;
    return this.http.get<Product[]>(url).pipe(
      tap(res => {
        this.productData$.next(res);
      })
    );
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/productDB.json`;
    return this.http.get<Product[]>(url)
      .pipe(
        map(txs => txs.find(txn => txn.id === productId))
      );
  }

  getSearchProducts(categoryValue: string, searchValue: string): void {
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/productDB.json`;
    this.http.get(url).toPromise().then((res: Product[]) => {
      if (categoryValue !== 'All') {
        this.productList = res.filter((product: Product) => product.category === categoryValue);
      }
      else {
        this.productList = res;
      }
      if (searchValue != null) {
        this.productList = this.productList.filter((product: Product) =>
          product.title.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1);
      }
      this.productData$.next(this.productList);
    });
  }

  getSearchProductsByCategories(categoryValue: string, subcategoryValue: string): void {
    console.log(categoryValue);
    console.log(subcategoryValue);
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/productDB.json`;
    this.http.get(url).toPromise().then((res: Product[]) => {
      this.productList = res.filter((product: Product) => product.category.toLocaleLowerCase() === categoryValue.toLocaleLowerCase());
      if (subcategoryValue !== '') {
        this.productList = this.productList.filter((product: Product) =>
          product.subcategory.toLocaleLowerCase() === subcategoryValue.toLocaleLowerCase());
      }
      this.productData$.next(this.productList);
    });
  }

}

