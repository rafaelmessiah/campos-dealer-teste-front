import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasComponent } from './vendas.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { VendaCadastrarComponent } from './venda-cadastrar/venda-cadastrar.component';
import { VendaEditarComponent } from './venda-editar/venda-editar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path:'',
        component:VendasComponent
      },
      {
        path:'cadastrar',
        component:VendaCadastrarComponent
      },
      {
        path:'editar/:id',
        component:VendaEditarComponent
      },
      
    ])
  ],
  declarations: [VendasComponent, VendaCadastrarComponent, VendaEditarComponent]
})
export class VendasModule { }
