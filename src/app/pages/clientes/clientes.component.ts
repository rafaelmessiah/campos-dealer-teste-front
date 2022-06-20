import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from './cliente.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];

  public colunas: string[] = ['id', 'nome', 'cidade'];

  constructor(public clienteService: ClienteService) { }

  ngOnInit() {
    //Subscribe na Lista de Clientes
    this.clienteService.clientes$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(clientes => this.clientes = clientes);

    this.clienteService.listar().subscribe();
  }

}
