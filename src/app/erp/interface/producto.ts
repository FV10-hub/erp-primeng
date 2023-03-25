export interface Producto {
  id:          number;
  descripcion: string;
  codigoBarra: string;
  precio:      number;
  precioCosto?: number;
  existencia:  number;
  createAt:    Date;
}
