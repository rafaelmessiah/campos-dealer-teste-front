import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from '../../models/cliente.model';
import { BehaviorSubject, take, tap } from 'rxjs';
import { ClienteDto } from '../../models/dto/cliente-dto.model';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

constructor(private http: HttpClient) { }

  private _clientes = new BehaviorSubject<Cliente[]>([])
  public clientes$ = this._clientes.asObservable();

  private _cliente = new BehaviorSubject<Cliente | null>(null)
  public cliente$ = this._cliente.asObservable();

  public listar(){
    return this.http.get<Cliente[]>(`${API_URL}/cliente/Listar`)
    .pipe(
      take(1),
      tap(clientes => this._clientes.next(clientes))
    )
  }

  public cadastrar(clienteDto: ClienteDto){
    return this.http.post<Cliente>(`${API_URL}/cliente/Cadastrar`, clienteDto)
    .pipe(
      take(1),
    )
  }

  public buscar(searchString: string){
    const params = new HttpParams()
    .set('searchString', searchString)

    return this.http.get<Cliente[]>(`${API_URL}/cliente/Buscar`, { params } )
    .pipe(
      take(1),
      tap(clientes => this._clientes.next(clientes))
    )
  }

  public obter(id: number){
    return this.http.get<Cliente>(`${API_URL}/cliente/Obter/${id}`)
    .pipe(
      take(1),
      tap(cliente => this._cliente.next(cliente))
    )
  }

  public editar(id: number, clienteDto: ClienteDto){
    return this.http.put<Cliente>(`${API_URL}/cliente/Editar/${id}`, clienteDto)
    .pipe(
      take(1),
      tap(cliente => this._cliente.next(cliente))
    )
  }

  public remover(id: number){
    return this.http.delete<boolean>(`${API_URL}/cliente/Remover/${id}`)
    .pipe(
      take(1),
      tap(() => this.removerDoSubject(id))
    )
  }

  private removerDoSubject(id: number){
    let clientes = this._clientes.getValue().filter(p => p.idCliente != id)
    this._clientes.next(clientes);
  }

  public obterDadosExternos(){
    return this.http.get(`${API_URL}/cliente/ObterDadosExternos/`)
    .pipe(
      take(1),
    )
  }
}
