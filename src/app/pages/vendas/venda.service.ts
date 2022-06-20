import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Venda } from '../../models/venda.model';
import { CadastrarVendaDto } from '../../models/dto/venda/cadastrar-venda.model';
import { EditarVendaDto } from '../../models/dto/venda/editar-venda.model';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private _vendas = new BehaviorSubject<Venda[]>([])
  public vendas$ = this._vendas.asObservable();

  private _venda = new BehaviorSubject<Venda | null>(null)
  public venda$ = this._venda.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Métodos Privados
   */
   private _listar(){
    this.http.get<Venda[]>(`${API_URL}/venda`)
    .pipe(
      take(1),
      tap(vendas => this._vendas.next(vendas))
    )
    .subscribe()
  }

  private _cadastrar(cadastrarVendaDto: CadastrarVendaDto){
    this.http.post<Venda>(`${API_URL}/venda`, cadastrarVendaDto)
    .pipe(
      take(1),
    )
    .subscribe()
  }

  private _obter(id: number){
    this.http.get<Venda>(`${API_URL}/venda/${id}`)
    .pipe(
      take(1),
      tap(venda => this._venda.next(venda))
    )
    .subscribe()
  }

  private _editar(id: number, editarVendaDto: EditarVendaDto){
    this.http.put<Venda>(`${API_URL}/produto/${id}`, editarVendaDto)
    .pipe(
      take(1),
      tap(venda => this._venda.next(venda))
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
