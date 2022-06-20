import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap, switchMap } from 'rxjs';
import { ClienteDto } from '../../../models/dto/cliente-dto.model';

@UntilDestroy()
@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['../clientes.component.scss']
})
export class ClientesEditarComponent implements OnInit {

  public cliente: Cliente | null = null;
  public editarClienteForm: FormGroup;

  constructor(private clienteService: ClienteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { 
                this.editarClienteForm = this.formBuilder.group({
                  nome:['', [Validators.required]],
                  cidade:['', [Validators.required]]
                })
              }

  ngOnInit() {
    //Subscribe no BehaviorSubject da Service
    this.clienteService.cliente$
    .pipe(
      untilDestroyed(this),
      tap(cliente => this.cliente = cliente)
    )
    .subscribe(cliente => this.editarClienteForm.patchValue({
      nome: cliente?.nmCliente,
      cidade:cliente?.Cidade
    }))

    this.route.params
    .pipe(
      untilDestroyed(this),
      map(params => +params['id']),
      switchMap(id => this.clienteService.obter(id))
    )
    .subscribe()
  }

  public onSubmit(){
    if(this.editarClienteForm.invalid) {
      return;
    }

    this.editar(this.editarClienteForm.value)
  }

  public editar(clienteDto: ClienteDto){
    if(this.cliente){
      this.clienteService.editar(this.cliente?.idCliente, clienteDto)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe({
        next: cliente => this.cliente = cliente,
        error: err => console.log(err)
      })
    }
  }
}
