import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ClienteDto } from '../../../models/dto/cliente-dto.model';

@Component({
  selector: 'app-cliente-cadastrar',
  templateUrl: './cliente-cadastrar.component.html',
  styleUrls: ['../clientes.component.scss']
})
export class ClienteCadastrarComponent implements OnInit {

  public cadastrarClienteForm: FormGroup;

  constructor(private clienteService: ClienteService,
              private formBuilder: FormBuilder) {
                this.cadastrarClienteForm = this.formBuilder.group({
                  nome:['', [Validators.required]],
                  cidade:['', [Validators.required]]
                })
              }

  ngOnInit() {
  }

  public onSubmit(){
    if(this.cadastrarClienteForm.invalid){
      return;
    }

    this.cadastrar(this.cadastrarClienteForm.value)
  }

  public cadastrar(clienteDto: ClienteDto){
    this.clienteService.cadastrar(clienteDto)
    .subscribe({
      next: cliente => console.log('Cliente cadastrado'),
      error: err => console.log('Houve um erro ao cadastrar um Cliente')
    })
  }

}
