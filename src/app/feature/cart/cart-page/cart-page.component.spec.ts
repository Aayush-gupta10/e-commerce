import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { HttpLoaderFactory } from 'src/app/shared/shared.module';

import { CartPageComponent } from './cart-page.component';
import { DebugElement } from '@angular/core';
import { CheckoutProductsComponent } from '../../checkout/checkout-products/checkout-products.component';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  const index = 1;
  // tslint:disable-next-line: prefer-const
  let cartService: CartService;
  const MOCK_CART_PRODUCTS: Cart = {
    data: [{
      product: {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches)',
        category: 'Electronics',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        subcategory: 'Laptop',
        quantity: 2
      },
      numInCart: 1
    }],
    total: 109.95
  };

  // tslint:disable-next-line: deprecation
  beforeEach(async((() => {
    TestBed.configureTestingModule({
      declarations: [CartPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'home/checkout', component: CheckoutProductsComponent }
       ]), TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
      ],
      providers: [ProductService, CartService, TranslateService]
    })
      .compileComponents();
  })));

  beforeEach(() => {
    cartService = TestBed.inject(CartService);
    spyOn(cartService, 'removeProductFromCart');
    spyOn(cartService, 'UpdateCartData');
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should load cart data on cart page', () => {
    component.cartProducts = MOCK_CART_PRODUCTS;
    fixture.detectChanges();
    expect(getCards().length).toBe(MOCK_CART_PRODUCTS.data.length);
  });

  it('should not load cart data on cart page when cart is empty', () => {
    localStorage.removeItem('cart');
    expect(getCards().length).toBe(0);
  });

  it('should call removeProductFromCart cart service method and remove the product from cart', () => {
    component.removeCartProduct(index);
    expect(cartService.removeProductFromCart).toHaveBeenCalled();
  });

  it('should call UpdateCartData cart service method and update the quantity of product from the cart', () => {
    component.ChangeQuantity(index , 2);
    expect(cartService.UpdateCartData).toHaveBeenCalled();
  });


  // tslint:disable-next-line: deprecation
  // it('should go to checkout url' , fakeAsync(inject([Router, Location], (router: Router, location: Location) => {

  //   fixture.detectChanges();
  //   let res = fixture.debugElement.query(By.css('.test-btn'))?.nativeElement.click();
  //   tick();
  //   console.log("hello" + res);
  //   expect(location.path()).toBe('home/checkout');
  // })));

  function getCards(): DebugElement[] {
    return fixture.debugElement.queryAll(By.css('div.item'));
  }


});
