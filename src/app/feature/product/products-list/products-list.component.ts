import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/models/product';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import {TooltipModule} from 'primeng/tooltip';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService,
              translate: TranslateService, private primengConfig: PrimeNGConfig,
              private route: ActivatedRoute) {
  }

  totalrecords: number;
  page = 1;

  category: string;
  sub: string;
  searchval: string;
  ngOnInit(): void {
    this.category = this.route.snapshot.queryParamMap.get('category');
    this.sub = this.route.snapshot.queryParamMap.get('sub');
    this.searchval = this.route.snapshot.queryParamMap.get('searchValue');
    this.page = 1;
    if (this.sub == null) {
      this.sub = '';
    }

    this.route.data.subscribe(data => {
      this.productList = data.productList;
    });
    if (this.category != null) {
      console.log(this.sub);
      this.productService.getSearchProducts(this.category, this.searchval);
    }
    if (this.category != null && this.sub != null) {
      this.productService.getSearchProductsByCategories(this.category, this.sub);
    }

    this.productService.productData$.subscribe(data => {
      this.page = 1;
      this.productList = data;
    });

  }

  addToCart(id: number): void {
    this.cartService.AddProductToCart(id);
  }

}
