import { Producto } from './producto';

export interface ItemFactura {
  id: number | null,
  producto: Producto;
  cantidad: number;
  importe: number;
  totalLinea?: number;

  /*public calcularImporte(): number {
    return this.cantidad * this.producto.precio;
  }*/
}
