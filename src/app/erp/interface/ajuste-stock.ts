import { Proveedor } from './proveedor';
import { ItemCompra } from './item-compra';
export interface AjusteStock {
  id: number | null;
  observacion: string;
  items: ItemCompra[];
  proveedor: Proveedor;
  totalCosto: number;
  createAt: Date;
}
