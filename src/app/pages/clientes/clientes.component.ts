import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
    {
      idCliente: 1,
      nmCliente: 'João',
      Cidade: 'Curitba'
    },
  ]
  public colunas: string[] = ['id', 'nome', 'cidade'];

  constructor() { }

  ngOnInit() {
  }

}
