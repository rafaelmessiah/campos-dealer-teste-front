import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProdutoDto } from '../../../models/dto/produto-dto.model';

@UntilDestroy()
@Component({
  selector: 'app-produto-cadastrar',
  templateUrl: './produto-cadastrar.component.html',
  styleUrls: ['../produtos.component.scss']
})
export class ProdutoCadastrarComponent implements OnInit {
  
  public cadastrarProdutoForm: FormGroup;

  constructor(private produtoService: ProdutoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
                this.cadastrarProdutoForm = this.formBuilder.group({
                  descricao:['', [Validators.required]],
                  valorUnitario:['', [Validators.required, Validators.min(1)]]
                })
              }

  ngOnInit() {
  }

  public onSubmit(){
    if(this.cadastrarProdutoForm.invalid){
      return;
    }

    this.cadastrar(this.cadastrarProdutoForm.value)
  }

  public cadastrar(produtoDto: ProdutoDto){
    this.produtoService.cadastrar(produtoDto)
    .subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: err => console.log('Erro ao cadastrar produto')
    })
  }
}
