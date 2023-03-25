import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Proveedor } from '../../../interface/proveedor';
import { Producto } from '../../../interface/producto';
import { Compra } from '../../../interface/compra';
import { ItemCompra } from '../../../interface/item-compra';
import { CompraService } from '../../../services/compra.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-compra-form',
  templateUrl: './compra-form.component.html',
  providers: [MessageService],
})
export class CompraFormComponent implements OnInit {
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
  public compraSelected: Compra = {
    id: 0,
    descripcion: '',
    observacion: '',
    nroFactura: '',
    items: [],
    proveedor: this.proveedorSelected,
    totalCompra: 0,
    createAt: new Date(),
  };
  public compraItemSelected: ItemCompra = {
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
    private compraService: CompraService,
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
      this.compraService.getCompra(this.id).subscribe((fac) => {
        if (!fac) {
          return this.router.navigateByUrl('/');
        }

        this.compraSelected = {
          id: 0,
          descripcion: '',
          observacion: '',
          nroFactura: '',
          items: [],
          proveedor: this.proveedorSelected,
          totalCompra: 0,
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
    this.compraSelected.proveedor = this.proveedorSelected;
  }

  onRowProductSelect(producto: Producto) {
    this.productoDialog = false;
    this.compraSelected.items.push({
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
    this.compraSelected.items = this.compraSelected.items.filter(
      (productDelete) => productDelete.producto.id !== productoToDelete.id
    );
  }

  openEditItemProduct(productoToEdit: Producto) {
    this.productoEditDialog = true;
    this.compraItemSelected = this.compraSelected.items.find(
      (productEdit) => productEdit.producto.id === productoToEdit.id
    )!;
    this.cantidadItem = this.compraItemSelected.cantidad;
    this.productoSelected = productoToEdit;
  }

  editItemProduct() {
    this.compraSelected.items.forEach((item) => {
      if (item.producto.id === this.compraItemSelected.producto.id) {
        item.producto = { ...this.compraItemSelected.producto };
        item.cantidad = this.cantidadItem;
        item.totalLinea =
          this.compraItemSelected.producto.precioCosto ?? 0 * this.cantidadItem;
        return item;
      }
      return item;
    });
    this.productoEditDialog = false;
  }

  hideEditItemCompra() {
    this.productoEditDialog = false;
  }

  guardar(): void {
    if (this.compraSelected.items.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar por lo menos 1 item',
        life: 3000,
      });
      return;
    }
    this.compraSelected.id = null;
    this.compraSelected.items.forEach((item) => {
      item.id = null;
    });
    this.compraSelected.totalCompra = this.compraSelected.items.reduce(
      (valor_anterior, obj) => valor_anterior + obj.totalLinea!,
      0
    );
    this.compraService.create(this.compraSelected).subscribe((factura) => {
      if (factura) {
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Compra con exito!.',
          life: 3000,
        });
        this.router.navigate(['/factura-list']);
        return;
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar por lo menos 1 item',
        life: 3000,
      });
    });
    //console.log(this.compraSelected);
  }
}
