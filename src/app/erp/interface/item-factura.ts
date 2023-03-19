import { Producto } from './producto';

export interface ItemFactura {
  id: number,
  producto: Producto;
  cantidad: number;
  importe: number;

  /*public calcularImporte(): number {
    return this.cantidad * this.producto.precio;
  }*/
}
