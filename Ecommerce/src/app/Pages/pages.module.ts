import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
