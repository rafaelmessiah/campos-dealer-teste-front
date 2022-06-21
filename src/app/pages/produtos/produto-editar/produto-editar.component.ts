import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, switchMap, tap } from 'rxjs';
import { ProdutoDto } from 'src/app/models/dto/produto-dto.model';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from '../produto.service';

@UntilDestroy()
@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['../produtos.component.scss']
})
export class ProdutoEditarComponent implements OnInit {

  public produto: Produto | null = null;
  public editarForm: FormGroup;

  constructor(private produtoService: ProdutoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
                this.editarForm = this.formBuilder.group({
                  descricao:['', [Validators.required]],
                  valorUnitario:['', [Validators.required, Validators.min(1)]]
                })
               }

  ngOnInit() {

    //Subscribe no BehaviorSubject da Service
    this.produtoService.produto$
    .pipe(
      untilDestroyed(this),
      tap(produto => this.produto = produto)
    )
    .subscribe(produto => this.editarForm.patchValue({
      descricao: produto?.dscProduto,
      valorUnitario:produto?.vlrUnitario
    }))
    
    
    this.route.params
    .pipe(
      untilDestroyed(this),
      map(params => +params['id']),
      switchMap(id => this.produtoService.obter(id))
    )
    .subscribe()
  }

  public onSubmit(){
    if(this.editarForm.invalid){
      console.log('ta bloqueando')
      return;
    }

    this.editar(this.editarForm.value);
  }

  public editar(produtoDto: ProdutoDto){
    if(this.produto){
      this.produtoService.editar(this.produto?.idProduto, produtoDto)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: err => console.log(err)
      })
    }
  }
}
