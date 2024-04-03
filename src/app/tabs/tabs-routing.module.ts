import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('../shop/shop.module').then((m) => m.ShopPageModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
