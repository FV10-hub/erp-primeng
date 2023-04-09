import { Producto } from './producto';

export interface ItemAjusteStock {
  id: number | null,
  producto: Producto;
  cantidad: number;
  totalLinea?: number;

}
