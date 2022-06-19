import { Cliente } from "./cliente";
import { Produto } from './produto';

export interface Venda {
    idVenda: number,
    qtdVenda: number,
    vlrUnitarioVenda: number,
    dthVenda: Date,
    vlrTotalVenda: number,
    cliente: Cliente,
    produto: Produto
}