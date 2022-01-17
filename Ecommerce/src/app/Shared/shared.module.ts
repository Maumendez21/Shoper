import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavProfileComponent } from './nav-profile/nav-profile.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavProfileComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NavProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
