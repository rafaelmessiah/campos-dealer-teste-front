import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { environment } from '../../../environments/environment';
import { ProdutoDto } from '../../models/dto/produto-dto.model';

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
  private _listar(){
    this.http.get<Produto[]>(`${API_URL}/produto`)
    .pipe(
      take(1),
      tap(produtos => this._produtos.next(produtos))
    )
    .subscribe()
  }

  private _cadastrar(produtoDto: ProdutoDto){
    this.http.post<Produto>(`${API_URL}/produto`, produtoDto)
    .pipe(
      take(1),
    )
    .subscribe()
  }

  private _obter(id: number){
    this.http.get<Produto>(`${API_URL}/produto/${id}`)
    .pipe(
      take(1),
      tap(produto => this._produto.next(produto))
    )
    .subscribe()
  }

  private _editar(id: number, produtoDto: ProdutoDto){
    this.http.put<Produto>(`${API_URL}/produto/${id}`, produtoDto)
    .pipe(
      take(1),
      tap(produto => this._produto.next(produto))
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
