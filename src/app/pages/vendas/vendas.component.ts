import { Component, OnInit } from '@angular/core';
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

  public colunas: string[] =['id', 'cliente', 'produto', 'quantidade', 'vlrUnitario', 'vlrTotal', 'dthVenda']

  constructor(public vendaService: VendaService) { }

  ngOnInit() {
    //Subscribe na Lista de Produtos
    this.vendaService.vendas$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(vendas => this.vendas = vendas);

    this.vendaService.listar().subscribe()
  }

}
