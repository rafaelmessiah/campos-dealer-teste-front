import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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


  /**
   * Métodos Privados
   */
  private _listar(){
    this.http.get<Cliente[]>(`${API_URL}/cliente`)
    .pipe(
      take(1),
      tap(clientes => this._clientes.next(clientes))
    )
    .subscribe()
  }

  private _cadastrar(clienteDto: ClienteDto){
    this.http.post<Cliente>(`${API_URL}/cliente`, clienteDto)
    .pipe(
      take(1),
    )
    .subscribe()
  }

  private _obter(id: number){
    this.http.get<Cliente>(`${API_URL}/cliente/${id}`)
    .pipe(
      take(1),
      tap(cliente => this._cliente.next(cliente))
    )
    .subscribe()
  }

  private _editar(id: number, clienteDto: ClienteDto){
    this.http.put<Cliente>(`${API_URL}/cliente/${id}`, clienteDto)
    .pipe(
      take(1),
      tap(produto => this._cliente.next(produto))
    )
    .subscribe()
  }

  /**
   * Métodos Publicos
   */
  public listar(){
    return this._listar();
  }

}
