import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Proveedor } from '../../../interface/proveedor';
import { Producto } from '../../../interface/producto';
import { AjusteStock } from '../../../interface/ajuste-stock';
import { ItemAjusteStock } from '../../../interface/item-ajuste-stock';
import { AjusteStockService } from '../../../services/ajuste-stock.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { ProductosService } from '../../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajuste-form',
  templateUrl: './ajuste-form.component.html',
  providers: [MessageService],
})
export class AjusteFormComponent  implements OnInit {
  private id: string = '';
  public proveedorDialog: boolean = false;
  public productoDialog: boolean = false;
  public productoEditDialog: boolean = false;
  public cantidadItem: number = 0;
  public proveedores: Proveedor[] = [];
  public productos: Producto[] = [];
  public proveedorSelected: Proveedor = {
    nombreCompleto: '',
    documento: '',
    telefono: '',
    createAt: new Date(),
    id: 0,
  };
  public productoSelected: Producto = {
    id: 0,
    descripcion: '',
    codigoBarra: '',
    precio: 0,
    existencia: 0,
    createAt: new Date(),
  };
  public ajusteStockSelected: AjusteStock = {
    id: 0,
    observacion: '',
    items: [],
    proveedor: this.proveedorSelected,
    totalCosto: 0,
    createAt: new Date(),
  };
  public ajusteItemSelected: ItemAjusteStock = {
    id: 1,
    cantidad: 1,
    producto: {
      id: 0,
      descripcion: '',
      codigoBarra: '',
      precio: 0,
      existencia: 0,
      createAt: new Date(),
    },
    totalLinea: 0,
  };

  constructor(
    private ajusteStockService: AjusteStockService,
    private proveedorService: ProveedoresService,
    private productoService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proveedorService.getProveedores().subscribe((proveedores) => {
      this.proveedores = proveedores;
    });
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    if (this.id !== 'null') {
      this.ajusteStockService.getAjusteStock(this.id).subscribe((fac) => {
        if (!fac) {
          return this.router.navigateByUrl('/');
        }

        this.ajusteStockSelected = {
          id: 0,
          observacion: '',
          items: [],
          proveedor: this.proveedorSelected,
          totalCosto: 0,
          createAt: new Date(),
        };
        return;
      });
    }
  }

  openProveedorDialog() {
    this.proveedorDialog = true;
  }

  onRowProveedorSelect(event: any) {
    this.proveedorDialog = false;
    this.ajusteStockSelected.proveedor = this.proveedorSelected;
  }

  onRowProductSelect(producto: Producto) {
    this.productoDialog = false;
    this.ajusteStockSelected.items.push({
      id: 0,
      cantidad: 1,
      producto,
      totalLinea: producto.precioCosto,
    });
  }

  openProductDialog() {
    this.productoDialog = true;
  }

  deleteItemProducto(productoToDelete: Producto) {
    this.ajusteStockSelected.items = this.ajusteStockSelected.items.filter(
      (productDelete) => productDelete.producto.id !== productoToDelete.id
    );
  }

  openEditItemProduct(productoToEdit: Producto) {
    this.productoEditDialog = true;
    this.ajusteItemSelected = this.ajusteStockSelected.items.find(
      (productEdit) => productEdit.producto.id === productoToEdit.id
    )!;
    this.cantidadItem = this.ajusteItemSelected.cantidad;
    this.productoSelected = productoToEdit;
  }

  editItemProduct() {
    this.ajusteStockSelected.items.forEach((item) => {
      if (item.producto.id === this.ajusteItemSelected.producto.id) {
        item.producto = { ...this.ajusteItemSelected.producto };
        item.cantidad = this.cantidadItem;
        item.totalLinea = item.producto.precioCosto! * item.cantidad;
          console.log(item);
          console.log(this.cantidadItem);
          console.log(this.ajusteItemSelected.producto.precioCosto);
          console.log(this.ajusteItemSelected.producto.precioCosto ?? 0 * this.cantidadItem)
        return item;
      }
      return item;
    });
    this.productoEditDialog = false;
  }

  hideEditItemAjusteStock() {
    this.productoEditDialog = false;
  }

  guardar(): void {
    if (this.ajusteStockSelected.items.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar por lo menos 1 item',
        life: 3000,
      });
      return;
    }
    this.ajusteStockSelected.id = null;
    this.ajusteStockSelected.items.forEach((item) => {
      item.id = null;
    });
    this.ajusteStockSelected.totalCosto = this.ajusteStockSelected.items.reduce(
      (valor_anterior, obj) => valor_anterior + obj.totalLinea!,
      0
    );
    this.ajusteStockService.create(this.ajusteStockSelected).subscribe((factura) => {
      if (factura) {
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Ajuste Stock con exito!.',
          life: 3000,
        });
        this.router.navigate(['/ajuste-list']);
        return;
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar por lo menos 1 item',
        life: 3000,
      });
    });
    //console.log(this.ajusteStockSelected);
  }
}
