import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Venda } from 'src/app/models/venda.model';
import { VendaService } from './venda.service';
@UntilDestroy()
@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public vendas: Venda[] = []
  public searchForm: FormGroup;
  public colunas: string[] =['id', 'cliente', 'produto', 'quantidade', 'vlrUnitario', 'vlrTotal', 'dthVenda']
  public dataSource = new MatTableDataSource

  constructor(public vendaService: VendaService,
              public formBuilder: FormBuilder,
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

  public search(){
    if(this.getSearch() != ''){
      this.vendaService.buscar(this.getSearch()).subscribe();
    }
    else{
      this.vendaService.listar().subscribe();
    }
  }

  toCadastrar(){
    this.router.navigate(['/vendas/cadastrar'])
  }
}
