import { Cliente } from "./cliente.model";
import { Produto } from './produto.model';

export interface Venda {
    idVenda: number,
    qtdVenda: number,
    vlrUnitarioVenda: number,
    dthVenda: Date,
    vlrTotalVenda: number,
    cliente: Cliente,
    produto: Produto
}