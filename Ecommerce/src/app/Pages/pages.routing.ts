import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AdminGuard } from '../Guards/admin.guard';
import { ProductsComponent } from './products/products/products.component';
import { ShowProductComponent } from './products/show-product/show-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const routes: Routes = [
    { 
        path: 'home', 
        component: PagesComponent,
        children: [
            {path: '', component: HomeComponent}
        ]
    },
    { 
        path: 'login', 
        component: PagesComponent,
        children: [
            {path: '', component: LoginComponent}
        ]
    },
    { 
        path: 'profile', 
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', component: ProfileComponent}
        ]
    },
    { 
        path: 'products', 
        component: PagesComponent,
        children: [
            {path: 'category/:id', component: ProductsComponent},
            {path: ':slug', component: ShowProductComponent}
        ]
    },
    { 
        path: 'cart', 
        component: PagesComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', component: ShoppingCartComponent},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
