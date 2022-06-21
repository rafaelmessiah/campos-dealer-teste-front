import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Venda } from '../../models/venda.model';
import { VendaDto } from 'src/app/models/dto/venda-dto.model';

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
  
  public listar(){
    return this.http.get<Venda[]>(`${API_URL}/venda/Listar`)
    .pipe(
      take(1),
      tap(vendas => this._vendas.next(vendas))
    )
  }

  public cadastrar(vendaDto: VendaDto){
    return this.http.post<Venda>(`${API_URL}/venda/Cadastrar`, vendaDto)
    .pipe(
      take(1),
    )
  }

  public obter(id: number){
    return this.http.get<Venda>(`${API_URL}/venda/Obter/${id}`)
    .pipe(
      take(1),
      tap(venda => this._venda.next(venda))
    )
  }

  public buscar(searchString: string){
    const params = new HttpParams()
    .set('searchString', searchString)
    
    return this.http.get<Venda[]>(`${API_URL}/venda/Buscar`, { params })
    .pipe(
      take(1),
      tap(vendas => this._vendas.next(vendas))
    )
  }

  public editar(id: number, vendaDto: VendaDto){
    return this.http.put<Venda>(`${API_URL}/venda/Editar/${id}`, vendaDto)
    .pipe(
      take(1),
      tap(venda => this._venda.next(venda))
    )
  }

  public remover(id: number){
    return this.http.delete<boolean>(`${API_URL}/venda/Remover/${id}`)
    .pipe(
      take(1),
      tap(() => this.removerDoSubject(id))
    )
  }

  public obterDadosExternos(){
    return this.http.get(`${API_URL}/venda/ObterDadosExternos/`)
    .pipe(
      take(1),
    )
  }

  private removerDoSubject(id: number){
    let vendas = this._vendas.getValue().filter(p => p.idVenda != id)
    this._vendas.next(vendas);
  }
  
}
