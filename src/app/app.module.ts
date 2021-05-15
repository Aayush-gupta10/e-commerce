import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CartModule } from './feature/cart/cart.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthenticationModule} from './feature/authentication/authentication.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    AuthenticationModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }})
  ],
  exports: [ TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
