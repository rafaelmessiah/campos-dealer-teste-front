import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, take, tap } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { environment } from '../../../environments/environment';
import { ProdutoDto } from '../../models/dto/produto-dto.model';
import { Params } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _produtos = new BehaviorSubject<Produto[]>([])
  public produtos$ = this._produtos.asObservable();

  private _produto = new BehaviorSubject<Produto | null>(null)
  public produto$ = this._produto.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Métodos Privados
   */
  public listar(){
    return this.http.get<Produto[]>(`${API_URL}/produto`)
    .pipe(
      take(1),
      tap(produtos => this._produtos.next(produtos))
    )
  }

  public buscar(searchString: string){
    const params = new HttpParams()
    .set('searchString', searchString)

    return this.http.get<Produto[]>(`${API_URL}/produto`, {params})
    .pipe(
      take(1),
      tap(produtos => this._produtos.next(produtos))
    )
  }

  public cadastrar(produtoDto: ProdutoDto){
    return this.http.post<Produto>(`${API_URL}/produto`, produtoDto)
    .pipe(
      take(1),
    )
  }

  public obter(id: number){
    return this.http.get<Produto>(`${API_URL}/produto/${id}`)
    .pipe(
      take(1),
      tap(produto => this._produto.next(produto))
    )
  }

  public editar(id: number, produtoDto: ProdutoDto){
    return this.http.put<Produto>(`${API_URL}/produto/${id}`, produtoDto)
    .pipe(
      take(1),
      tap(produto => this._produto.next(produto))
    )
  }
}
