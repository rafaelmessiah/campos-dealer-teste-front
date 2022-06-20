import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from './cliente.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public searchForm: FormGroup;
  public colunas: string[] = ['id', 'nome', 'cidade'];

  constructor(public clienteService: ClienteService,
              public formBuilder: FormBuilder,
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

  public search(){
    if(this.getSearch() != ''){
      this.clienteService.buscar(this.getSearch()).subscribe();
    }
    else{
      this.clienteService.listar().subscribe();
    }
  }

  toCadastrar(){
    this.router.navigate(['/clientes/cadastrar'])
  }
}
