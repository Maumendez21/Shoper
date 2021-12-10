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
import { InventaryComponent } from './products/inventary/inventary.component';
import { CuponsComponent } from './cupons/cupons.component';
import { ActionCuponsComponent } from './cupons/action-cupons/action-cupons.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { VariedadComponent } from './products/variedad/variedad.component';
import { GaleryAddComponent } from './products/galery-add/galery-add.component';





@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ClientsComponent,
    ActionComponent,
    ProductsComponent,
    ActionProductsComponent,
    InventaryComponent,
    CuponsComponent,
    ActionCuponsComponent,
    ConfigurationComponent,
    VariedadComponent,
    GaleryAddComponent
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
