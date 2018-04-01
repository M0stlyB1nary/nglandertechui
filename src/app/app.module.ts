import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { UtilityComponent } from './utility/utility.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // <-- NgModel lives here
import { ProductService } from './services/product.service';
import { ProductSearchComponent } from './product-search/product-search.component';



@NgModule({
  declarations: [
    AppComponent,
    UtilityComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HeroService, MessageService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
