import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

describe('CartService', () => {
  let service: CartService;
  let productService: ProductService;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const product: Product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 209.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: 'Electronics',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    subcategory : 'Laptop',
    quantity: 10
  };

  const cart = {
    total: 1,
    data: [{
      product,
      numInCart: 3
    }]
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , RouterTestingModule],
      providers: [
        ProductService,
        {provide: Router, useValue: mockRouter}
      ]
    });

    let store = {};
    const mockLocalStorage = {
      getItem: (key: 'cart'): string => {
        return JSON.stringify(cart);
      },
      setItem: (key: 'cart', value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: 'cart') => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    service = TestBed.inject(CartService);
    productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProductById').and.returnValue(of(product));
    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
    spyOn(service, 'CalculateTotal').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add product to cart',
       // tslint:disable-next-line: no-shadowed-variable
       inject([CartService], (service: CartService) => {
        service.AddProductToCart(1 , 3);
        expect(localStorage.getItem('cart')).toBe(JSON.stringify(cart));
       }));

  // shoud delete product in cart
  // tslint:disable-next-line: no-shadowed-variable
  it('shoud delete product in cart and update total' , inject([CartService], (service: CartService) => {
    service.removeProductFromCart(1);
    expect(service.CalculateTotal).toHaveBeenCalled();
   }));

  // shoud update product in carttslint:disable-next-line: no-shadowed-variable
  // tslint:disable-next-line: no-shadowed-variable
  it('shoud update(increase) quantity of  product in cart' , inject([CartService], (service: CartService) => {
    service.UpdateCartData(0 , true);
    expect(service.cartDataServer.data[0].numInCart).toBe(1);
   }));

  // tslint:disable-next-line: no-shadowed-variable
  it('shoud redirect to home/product and empty the cart on checkout' , inject([CartService], (service: CartService) => {
    service.CheckoutFromCart();
    expect(service.cartDataServer.data[0].product).toBe(undefined);
    expect (mockRouter.navigate).toHaveBeenCalledWith (['/home/product']);
   }));
});
