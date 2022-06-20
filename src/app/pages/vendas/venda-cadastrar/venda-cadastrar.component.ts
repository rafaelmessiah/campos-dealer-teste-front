import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendaService } from '../venda.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from '../../produtos/produto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClienteService } from '../../clientes/cliente.service';
import { VendaDto } from '../../../models/dto/venda-dto.model';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-venda-cadastrar',
  templateUrl: './venda-cadastrar.component.html',
  styleUrls: ['../vendas.component.scss']
})
export class VendaCadastrarComponent implements OnInit {

  public cadastrarVendaForm: FormGroup;
  public clientes: Cliente[] = [];
  public produtos: Produto[] = [];

  constructor(private vendaService: VendaService,
              private produtoService: ProdutoService,
              private clienteService: ClienteService,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.cadastrarVendaForm = this.formBuilder.group({
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
  }

  public onSubmit(){
    if(this.cadastrarVendaForm.invalid){
      return;
    }

    this.cadastrar(this.cadastrarVendaForm.value)
  }

  public cadastrar(vendaDto: VendaDto){
    this.vendaService.cadastrar(vendaDto)
    .subscribe({
      next: () => this.router.navigate(['/vendas']),
      error: err => console.log('Houve um erro ao cadastrar um Cliente')
    })
  }

}
