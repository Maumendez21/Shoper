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





@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ClientsComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
