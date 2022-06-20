import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from './produto.service';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@UntilDestroy()
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[] = []
  public searchForm: FormGroup;
  public colunas: string[] = ['id', 'descricao', 'valor']

  constructor(public produtoService: ProdutoService,
              public formBuilder: FormBuilder) {
                this.searchForm = this.formBuilder.group({
                  searchString:['']
                })
              }

  ngOnInit() {
    //Subscribe na lista de produtos
    this.produtoService.produtos$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(produtos => this.produtos = produtos)

    this.produtoService.listar().subscribe();
  }

  getSearch() {
    return this.searchForm.controls['searchString'].value
  }

  public search(){
    if(this.getSearch() != ''){
      this.produtoService.buscar(this.getSearch()).subscribe();
    }
    else{
      this.produtoService.listar().subscribe();
    }
  }
}
