import { ItemFactura } from './item-factura';
import { Cliente } from './cliente';
export interface Factura {
  id: number | null;
  descripcion: string;
  observacion: string;
  nroFactura: string;
  items: ItemFactura[];
  cliente: Cliente;
  totalFactura: number;
  createAt: Date;

  /*calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemFactura) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }*/
}
