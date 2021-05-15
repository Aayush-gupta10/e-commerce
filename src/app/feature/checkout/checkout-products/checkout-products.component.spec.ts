import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartService } from 'src/app/core/services/cart.service';
import { HttpLoaderFactory } from 'src/app/shared/shared.module';

import { CheckoutProductsComponent } from './checkout-products.component';

describe('CheckoutProductsComponent', () => {
  let component: CheckoutProductsComponent;
  let fixture: ComponentFixture<CheckoutProductsComponent>;

  // tslint:disable-next-line: deprecation
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutProductsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule , TranslateModule.forRoot({
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
        }})],
      providers: [CartService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
