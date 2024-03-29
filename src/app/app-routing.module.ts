import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./shared/auth/auth.guard";

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorite',
    loadChildren: () => import('./pages/favorite/favorite.module').then(m => m.FavoriteModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pc-builder',
    loadChildren: () => import('./pages/pc-builder/pc-builder.module').then(m => m.PcBuilderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: 'top-products',
    loadChildren: () => import('./pages/top-products/top-products.module').then(m => m.TopProductsModule),
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
