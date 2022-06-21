import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Cliente } from 'src/app/models/cliente.model';
import { Produto } from 'src/app/models/produto.model';
import { Venda } from 'src/app/models/venda.model';
import { ClienteService } from '../../clientes/cliente.service';
import { ProdutoService } from '../../produtos/produto.service';
import { VendaService } from '../venda.service';
import { map, tap, switchMap } from 'rxjs';
import { VendaDto } from '../../../models/dto/venda-dto.model';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-venda-editar',
  templateUrl: './venda-editar.component.html',
  styleUrls: ['../vendas.component.scss']
})
export class VendaEditarComponent implements OnInit {

  public venda: Venda | null = null;
  public editarVendaForm: FormGroup;
  public clientes: Cliente[] = [];
  public produtos: Produto[] = [];

  constructor(private vendaService: VendaService,
              private produtoService: ProdutoService,
              private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.editarVendaForm = this.formBuilder.group({
                  idCliente:['', [Validators.required]],
                  idProduto:['', [Validators.required]],
                  qtdVenda:['',[Validators.required]]
                })
              }

  ngOnInit() {
    //Popula a lista de Produtos
    this.produtoService.produtos$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(produtos => this.produtos = produtos);

    this.produtoService.listar().subscribe();

    //Popula a lista de Clientes
    this.clienteService.clientes$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(clientes => this.clientes = clientes);

    this.clienteService.listar().subscribe();

    //Puxa os dados da Venda
    this.vendaService.venda$
    .pipe(
      untilDestroyed(this),
      tap(venda => this.venda = venda)
    )
    .subscribe(venda => this.editarVendaForm.patchValue({
      idCliente: venda?.Cliente.idCliente,
      idProduto: venda?.Produto.idProduto,
      qtdVenda: venda?.qtdVenda
    }))

    this.route.params
    .pipe(
      untilDestroyed(this),
      map(params => +params['id']),
      switchMap(id => this.vendaService.obter(id))
    )
    .subscribe();
  }

  public onSubmit(){
    if(this.editarVendaForm.invalid) {
      return;
    }

    this.editar(this.editarVendaForm.value)
  }

  public editar(vendaDto: VendaDto){
    if(this.venda) {
      this.vendaService.editar(this.venda.idVenda, vendaDto)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe({
        next: () => this.router.navigate(['/vendas']),
        error: err => console.log(err)
      })
    }
  }
}
