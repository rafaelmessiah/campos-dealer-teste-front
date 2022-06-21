import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from './produto.service';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '../../components/dialog.service';

@UntilDestroy()
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[] = []
  public searchForm: FormGroup;
  public colunas: string[] = ['id', 'descricao', 'valor', 'actions']
  public isLoading: boolean = false;

  constructor(public produtoService: ProdutoService,
              public formBuilder: FormBuilder,
              public dialogService: DialogService,
              public router: Router) {
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

  toCadastrar() {
    this.router.navigate(['/produtos/cadastrar'])
  }

  toEditar(id: number) {
    this.router.navigate([`/produtos/editar/${id}`])
  }
  
  public search() {
    if(this.getSearch() != ''){
      this.produtoService.buscar(this.getSearch()).subscribe();
    }
    else{
      this.produtoService.listar().subscribe();
    }
  }

  public remover(id: number) {
    this.dialogService.confirmDialog({
      titulo: 'Atenção',
      mensagem: 'Tem certeza que quer excluir esse produto?'
    })
    .pipe(
      untilDestroyed(this),
      tap(res => {
        if(res){
          this.produtoService.remover(id).subscribe();
        }
      })
    )
    .subscribe();
  }

  public obterDadosExternos(){
    this.isLoading = true;
    this.produtoService.obterDadosExternos()
    .subscribe(
      () => this.isLoading = false
    )

    this.produtoService.listar().subscribe()
  }
}
