import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from './venda.service';
import { DialogService } from '../../components/dialog.service';
import { switchMap, tap } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public vendas: Venda[] = []
  public searchForm: FormGroup;
  public colunas: string[] =['id', 'cliente', 'produto', 'quantidade', 'vlrUnitario', 'vlrTotal', 'dthVenda', 'actions']

  constructor(public vendaService: VendaService,
              public formBuilder: FormBuilder,
              public dialogService: DialogService,
              public router: Router) {
                this.searchForm = this.formBuilder.group({
                  searchString:['']
                })
              }

  ngOnInit() {
    //Subscribe na Lista de Produtos
    this.vendaService.vendas$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(vendas => this.vendas = vendas);

    this.vendaService.listar().subscribe()
  }

  getSearch() {
    return this.searchForm.controls['searchString'].value
  }

  toCadastrar(){
    this.router.navigate(['/vendas/cadastrar'])
  }

  toEditar(id: number) {
    this.router.navigate([`/vendas/editar/${id}`])
  }

  public search(){
    if(this.getSearch() != ''){
      this.vendaService.buscar(this.getSearch()).subscribe();
    }
    else{
      this.vendaService.listar().subscribe();
    }
  }

  public remover(id: number) {
    this.dialogService.confirmDialog({
      titulo: 'Atenção',
      mensagem: 'Tem certeza que quer excluir essa venda?'
    })
    .pipe(
      untilDestroyed(this),
      tap(res => {
        if(res){
          this.vendaService.remover(id).subscribe();
        }
      })
    )
    .subscribe();
  }

  public obterDadosExternos(){
    this.vendaService.obterDadosExternos()
    .subscribe()

    this.vendaService.listar().subscribe()
  }
}
