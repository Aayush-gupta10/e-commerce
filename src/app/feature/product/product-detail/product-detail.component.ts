import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              translate: TranslateService) {

  }

  product: Product;

  Quantity = 0;
  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.product = data.productList;
    });

  }

  Increase(): void{
    this.Quantity++;
  }
  Decrease(): void {
    if (this.Quantity > 0)
    {
      this.Quantity--;
    }
  }
  addToCart(id: number): void {
    this.cartService.AddProductToCart(id, this.Quantity);
  }

}
