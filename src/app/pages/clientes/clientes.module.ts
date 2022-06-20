import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteCadastrarComponent } from './cliente-cadastrar/cliente-cadastrar.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'',
        component:ClientesComponent
      },
      {
        path:'cadastrar',
        component:ClienteCadastrarComponent
      },
      {
        path:'editar/:id',
        component:ClientesEditarComponent
      }
    ])
  ],
  declarations: [ClientesComponent, ClienteCadastrarComponent, ClientesEditarComponent]
})
export class ClientesModule { }
