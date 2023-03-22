import { Proveedor } from './proveedor';
import { ItemCompra } from './item-compra';
export interface Compra {
  id: number | null;
  descripcion: string;
  observacion: string;
  nroFactura: string;
  items: ItemCompra[];
  proveedor: Proveedor;
  totalCompra: number;
  createAt: Date;

  /*calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemFactura) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }*/
}
