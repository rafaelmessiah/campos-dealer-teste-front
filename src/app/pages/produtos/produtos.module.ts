import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoCadastrarComponent } from './produto-cadastrar/produto-cadastrar.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path:'',
        component:ProdutosComponent
      },
      {
        path:'editar/:id',
        component:ProdutoEditarComponent
      },
      {
        path:'cadastrar',
        component:ProdutoCadastrarComponent
      }
    ])
  ],
  declarations: [ProdutosComponent, ProdutoEditarComponent, ProdutoCadastrarComponent]
})
export class ProdutosModule { }
