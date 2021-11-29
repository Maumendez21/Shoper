import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './clients/clients.component';
import { ActionComponent } from './clients/action/action.component';
import { ProductsComponent } from './products/products.component';
import { ActionProductsComponent } from './products/action-products/action-products.component';
import { NgxTinymceModule } from 'ngx-tinymce';





@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ClientsComponent,
    ActionComponent,
    ProductsComponent,
    ActionProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgxTinymceModule.forRoot({
      baseURL: '../assets/js/tinymce/'
    })
  ]
})
export class PagesModule { }
