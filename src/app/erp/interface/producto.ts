export interface Producto {
  id:          number;
  descripcion: string;
  codigoBarra: string;
  precio:      number;
  existencia:  number;
  createAt:    Date;
}
