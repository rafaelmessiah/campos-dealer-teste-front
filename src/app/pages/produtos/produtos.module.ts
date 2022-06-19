import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DetalheComponent } from './detalhe/detalhe.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path:'',
        component:ProdutosComponent
      },
      {
        path:':id',
        component:DetalheComponent
      }
    ])
  ],
  declarations: [ProdutosComponent, DetalheComponent]
})
export class ProdutosModule { }
