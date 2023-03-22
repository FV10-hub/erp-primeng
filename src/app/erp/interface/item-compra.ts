import { Producto } from './producto';

export interface ItemCompra {
  id: number | null,
  producto: Producto;
  cantidad: number;
  totalLinea?: number;

  /*public calcularImporte(): number {
    return this.cantidad * this.producto.precio;
  }*/
}
