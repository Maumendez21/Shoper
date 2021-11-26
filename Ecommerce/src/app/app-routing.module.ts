import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './Pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
    // PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
