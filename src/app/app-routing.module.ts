import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'vendas',
    loadChildren: () => import('./pages/vendas/vendas.module').then(m => m.VendasModule)
  },
  {
    path: '**',
    redirectTo: '/home' //Error 404 - Page not found
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
