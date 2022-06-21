import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from './cliente.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog.service';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public searchForm: FormGroup;
  public isLoading: boolean = false;
  public colunas: string[] = ['id', 'nome', 'cidade', 'actions'];

  constructor(public clienteService: ClienteService,
              public formBuilder: FormBuilder,
              public dialogService: DialogService,
              public router: Router) {
                this.searchForm = this.formBuilder.group({
                  searchString:['']
                });
               }

  ngOnInit() {
    //Subscribe na Lista de Clientes
    this.clienteService.clientes$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(clientes => this.clientes = clientes);

    this.clienteService.listar().subscribe();
  }

  getSearch() {
    return this.searchForm.controls['searchString'].value
  }

  toCadastrar(){
    this.router.navigate(['/clientes/cadastrar'])
  }

  toEditar(id: number) {
    this.router.navigate([`/clientes/editar/${id}`])
  }

  public search(){
    if(this.getSearch() != ''){
      this.clienteService.buscar(this.getSearch()).subscribe();
    }
    else{
      this.clienteService.listar().subscribe();
    }
  }

  public remover(id: number) {
    this.dialogService.confirmDialog({
      titulo: 'Atenção',
      mensagem: 'Tem certeza que quer excluir esse cliente?'
    })
    .pipe(
      untilDestroyed(this),
      tap(res => {
        if(res){
          this.clienteService.remover(id).subscribe();
        }
      })
    )
    .subscribe();
  }

  public obterDadosExternos(){
    this.isLoading = true;
    this.clienteService.obterDadosExternos()
    .subscribe(
      () => this.isLoading = false
    )

    this.clienteService.listar().subscribe()
  }
}
