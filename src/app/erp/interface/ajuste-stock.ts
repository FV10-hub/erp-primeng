import { ItemAjusteStock } from './item-ajuste-stock';
export interface AjusteStock {
  id: number | null;
  observacion: string;
  items: ItemAjusteStock[];
  totalCosto: number;
  createAt: Date;
}
