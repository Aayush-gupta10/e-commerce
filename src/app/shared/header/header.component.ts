import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/models/cart';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { MenuItem } from 'primeng/api';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: Cart;
  searchform = new FormGroup({
    searchValue: new FormControl(''),
    categoryValue: new FormControl('All')
  });
  isLoggedIn: boolean;

  items: MenuItem[];
  constructor(private cartService: CartService,
              private productService: ProductService,
              public translate: TranslateService,
              private router: Router,
              public authService: AuthService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    console.log(translate.currentLang);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  productsInCart: number;
  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => {
      this.cartData = data;
      this.productsInCart = 0;
      this.cartData.data.forEach(ele => {
        this.productsInCart = this.productsInCart + ele.numInCart;
      });
    });
    this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.items = this.buildCateroryMenu();
      });
    this.authService.isLoggedIn$.subscribe(data => this.isLoggedIn = data);
  }

  buildCateroryMenu(): MenuItem[] {
    const retVal: MenuItem[] = [{
      label: this.translate.instant('HEADER.CLOTHING'),
      items: [
        {
          label: this.translate.instant('HEADER.ALLCLOTHING'), command: () => {
            this.productService.getSearchProductsByCategories('Fashion', '');
            this.searchform.get('categoryValue').setValue('Fashion');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Fashion' } });
          },
        },
        {
          label: this.translate.instant('HEADER.MEN'), command: () => {
            this.productService.getSearchProductsByCategories('Fashion', 'Men');
            this.searchform.get('categoryValue').setValue('Fashion');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Fashion', sub: 'Men' } });
          },
        },
        {
          label: this.translate.instant('HEADER.WOMEN'), command: () => {
            this.productService.getSearchProductsByCategories('Fashion', 'Women');
            this.searchform.get('categoryValue').setValue('Fashion');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Fashion', sub: 'Women' } });
          },
        },
        {
          label: this.translate.instant('HEADER.ACCESSORIES'), command: () => {
            this.productService.getSearchProductsByCategories('Fashion', 'Accessories');
            this.searchform.get('categoryValue').setValue('Fashion');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Fashion', sub: 'Accessories' } });
          },
        }
      ]

    },
    {
      label: 'Electronics',
      items: [
        {
          label: this.translate.instant('HEADER.ALLELECTRONICS'), command: () => {
            this.productService.getSearchProductsByCategories('Electronics', '');
            this.searchform.get('categoryValue').setValue('Electronics');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Electonics' } });
          },
        },
        {
          label: this.translate.instant('HEADER.MOBILE'), command: () => {
            this.productService.getSearchProductsByCategories('Electronics', 'Mobile');
            this.searchform.get('categoryValue').setValue('Electronics');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Electronics', sub: 'Mobile' } });
          },
        },
        {
          label: this.translate.instant('HEADER.LAPTOP'), command: () => {
            this.productService.getSearchProductsByCategories('Electronics', 'Laptop');
            this.searchform.get('categoryValue').setValue('Electronics');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Electronics', sub: 'Laptop' } });
          },
        },
        {
          label: this.translate.instant('HEADER.ACCESSORIES'), command: () => {
            this.productService.getSearchProductsByCategories('Electronics', 'Accessories');
            this.searchform.get('categoryValue').setValue('Electronics');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Electronics', sub: 'Accessories' } });
          },
        }
      ]
    },
    {
      label: 'Food',
      items: [
        {
          label: this.translate.instant('HEADER.AllFOOD'), command: () => {
            this.productService.getSearchProductsByCategories('Food', '');
            this.searchform.get('categoryValue').setValue('Food');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Food' } });
          }
        },
        {
          label: this.translate.instant('HEADER.FRUIT'), command: () => {
            this.productService.getSearchProductsByCategories('Food', 'Fruit');
            this.searchform.get('categoryValue').setValue('Food');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Food', sub: 'Food' } });
          },
        },
        {
          label: this.translate.instant('HEADER.BAKERY'), command: () => {
            this.productService.getSearchProductsByCategories('Food', 'Bakery');
            this.searchform.get('categoryValue').setValue('Food');
            this.router.navigate(['/home/product'], { queryParams: { category: 'Food', sub: 'Bakery' } });
          },
        }]
    }
    ];

    return retVal;
  }

  onSearch(): void {
    this.router.navigate(['/home/product'],
      { queryParams: { category: this.searchform.value.categoryValue, searchValue: this.searchform.value.searchValue } });
    this.productService.getSearchProducts(this.searchform.value.categoryValue, this.searchform.value.searchValue);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home/product');
  }

}
