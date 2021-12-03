import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '../Guards/admin.guard';
import { ClientsComponent } from './clients/clients.component';
import { ActionComponent } from './clients/action/action.component';
import { ProductsComponent } from './products/products.component';
import { ActionProductsComponent } from './products/action-products/action-products.component';
import { InventaryComponent } from './products/inventary/inventary.component';
import { CuponsComponent } from './cupons/cupons.component';
import { ActionCuponsComponent } from './cupons/action-cupons/action-cupons.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
    { 
        path: 'panel', 
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: HomeComponent},
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
            { path: 'inventary/:id', component: InventaryComponent},
        ]
    },
    {
        path: 'cupons',
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: CuponsComponent},
            { path: ':id', component: ActionCuponsComponent},
            // { path: 'inventary/:id', component: InventaryComponent},
        ]
    },
    {
        path: 'configurations',
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', component: ConfigurationComponent},
            // { path: ':id', component: ActionCuponsComponent},
            // { path: 'inventary/:id', component: InventaryComponent},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
