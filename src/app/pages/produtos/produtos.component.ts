import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from './produto.service';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[] = []

  public colunas: string[] = ['id', 'descricao', 'valor']

  constructor(public produtoService: ProdutoService) { }

  ngOnInit() {

    //Subscribe na Lista de Produtos
    this.produtoService.produtos$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(produtos => this.produtos = produtos);

    this.produtoService.listar();
  }

}
