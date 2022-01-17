import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProductsComponent } from './products/products/products.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowProductComponent } from './products/show-product/show-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ProductsComponent,
    ShowProductComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class PagesModule { }
