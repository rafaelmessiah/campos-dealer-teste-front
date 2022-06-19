import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/models/venda.model';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public vendas: Venda[] = [
    {
      idVenda: 2,
      qtdVenda: 7,
      vlrUnitarioVenda: 2000.00,
      dthVenda: new Date('2022-06-15 20:20:47.010'),
      vlrTotalVenda: 14000.00,
      cliente:  {idCliente: 1, nmCliente: 'João', Cidade: 'Curitba' },
      produto: { idProduto: 1, dscProduto: 'Teste 1', vlrUnitario: 2000.00 }
    },
    {
      idVenda: 2,
      qtdVenda: 7,
      vlrUnitarioVenda: 2000.00,
      dthVenda: new Date('2022-06-15 20:20:47.010'),
      vlrTotalVenda: 14000.00,
      cliente:  {idCliente: 1, nmCliente: 'João', Cidade: 'Curitba' },
      produto: { idProduto: 1, dscProduto: 'Teste 1', vlrUnitario: 2000.00 }
    },
    {
      idVenda: 2,
      qtdVenda: 7,
      vlrUnitarioVenda: 2000.00,
      dthVenda: new Date('2022-06-15 20:20:47.010'),
      vlrTotalVenda: 14000.00,
      cliente:  {idCliente: 1, nmCliente: 'João', Cidade: 'Curitba' },
      produto: { idProduto: 1, dscProduto: 'Teste 1', vlrUnitario: 2000.00 }
    }
  ]

  public colunas: string[] =['id', 'cliente', 'produto', 'quantidade', 'vlrUnitario', 'vlrTotal', 'dthVenda']

  constructor() { }

  ngOnInit() {
  }

}
