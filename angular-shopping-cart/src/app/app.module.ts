import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CartHeaderComponent } from './cart-header/cart-header.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartPromoCodeComponent } from './cart-promo-code/cart-promo-code.component';

@NgModule({
  declarations: [
    AppComponent,
    CartHeaderComponent,
    CartProductsComponent,
    CartSummaryComponent,
    CartPromoCodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
