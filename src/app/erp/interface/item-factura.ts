import { Producto } from './producto';

export interface ItemFactura {
  producto: Producto;
  cantidad: number;
  importe: number;

  /*public calcularImporte(): number {
    return this.cantidad * this.producto.precio;
  }*/
}
