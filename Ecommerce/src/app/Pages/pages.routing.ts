import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


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

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
