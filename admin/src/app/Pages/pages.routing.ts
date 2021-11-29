import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '../Guards/admin.guard';
import { ClientsComponent } from './clients/clients.component';
import { ActionComponent } from './clients/action/action.component';
import { ProductsComponent } from './products/products.component';
import { ActionProductsComponent } from './products/action-products/action-products.component';


const routes: Routes = [
    { 
        path: 'panel', 
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: HomeComponent},
            { path: 'clients', component: ClientsComponent },
        ]
    },
    {
        path: 'clients',
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: ClientsComponent},
            { path: ':id', component: ActionComponent},
            // { path: 'clients', component: ClientsComponent },
        ]
    },
    {
        path: 'products',
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: ProductsComponent},
            { path: ':id', component: ActionProductsComponent},
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
