import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[] = [
    {
      idProduto: 1,
      dscProduto: 'Teste 1',
      vlrUnitario: 2000.00
    },
    {
      idProduto: 2,
      dscProduto: 'Teste 2',
      vlrUnitario: 500.00
    },
    {
      idProduto: 3,
      dscProduto: 'Teste 3',
      vlrUnitario: 1000.00
    },
  ]

  public colunas: string[] = ['id', 'descricao', 'valor']

  constructor() { }

  ngOnInit() {
  }

}
