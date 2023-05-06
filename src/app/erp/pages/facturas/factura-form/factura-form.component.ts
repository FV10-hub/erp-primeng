import { ClientesService } from './../../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from '../../../services/factura.service';
import { Factura } from '../../../interface/factura';
import { Cliente } from '../../../interface/cliente';
import { ItemFactura } from '../../../interface/item-factura';
import { Producto } from '../../../interface/producto';
import { ProductosService } from '../../../services/productos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  providers: [MessageService],
})
export class FacturaFormComponent implements OnInit {
  private id: string = '';
  public clienteDialog: boolean = false;
  public productoDialog: boolean = false;
  public productoEditDialog: boolean = false;
  public cantidadItem: number = 0;
  public totalComprobante: number = 0;
  public totalIva: number = 0;
  public clientes: Cliente[] = [];
  public productos: Producto[] = [];
  public clienteSelected: Cliente = {
    nombreCompleto: '',
    documento: '',
    telefono: '',
    chapa: '',
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
  public facturaSelected: Factura = {
    id: 0,
    descripcion: '',
    observacion: '',
    nroFactura: '',
    items: [],
    cliente: this.clienteSelected,
    totalFactura: 0,
    createAt: new Date(),
  };
  public facturaItemSelected: ItemFactura = {
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
    importe: 30.0,
  };

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClientesService,
    private productoService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    if (this.id !== 'null') {
      this.facturaService.getFactura(this.id).subscribe((fac) => {
        if (!fac) {
          return this.router.navigateByUrl('/');
        }

        this.facturaSelected = {
          id: 0,
          descripcion: '',
          observacion: '',
          nroFactura: '',
          items: [],
          cliente: this.clienteSelected,
          totalFactura: 0,
          createAt: new Date(),
        };
        return;
      });
    }
  }

  openClientDialog() {
    this.clienteDialog = true;
  }

  onRowClientSelect(event: any) {
    this.clienteDialog = false;
    this.facturaSelected.cliente = this.clienteSelected;
  }

  onRowProductSelect(producto: Producto) {
    if (producto.existencia > 0) {
      this.productoEditDialog = false;
      this.productoDialog = false;
      this.facturaSelected.items.push({
        id: 0,
        cantidad: 1,
        importe: producto.precio,
        producto,
        totalLinea: producto.precio,
      });
      this.calcularTotales();

      return;
    }
    console.log('NO ENtRO');
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'La existencia no es suficiente',
      life: 3000,
    });
  }

  openProductDialog() {
    this.productoDialog = true;
  }

  deleteItemProducto(productoToDelete: Producto) {
    this.facturaSelected.items = this.facturaSelected.items.filter(
      (productDelete) => productDelete.producto.id !== productoToDelete.id
    );
    this.calcularTotales();
  }

  openEditItemProduct(productoToEdit: Producto) {
    this.productoEditDialog = true;
    this.facturaItemSelected = this.facturaSelected.items.find(
      (productEdit) => productEdit.producto.id === productoToEdit.id
    )!;
    this.cantidadItem = this.facturaItemSelected.cantidad;
    this.productoSelected = productoToEdit;
  }

  editItemProduct() {
    if (this.cantidadItem < this.facturaItemSelected.producto.existencia) {
      this.facturaSelected.items.forEach((item) => {
        if (item.producto.id === this.facturaItemSelected.producto.id) {
          item.producto = { ...this.facturaItemSelected.producto };
          item.cantidad = this.cantidadItem;
          item.totalLinea =
            this.facturaItemSelected.producto.precio * this.cantidadItem;
          this.calcularTotales();
          return item;
        }
        return item;
      });
      this.productoEditDialog = false;
      return;
    }
    console.log('NO ENtRO');
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'La existencia no es suficiente',
      life: 3000,
    });
    this.productoEditDialog = false;
  }

  hideEditItemFactura() {
    this.productoEditDialog = false;
  }

  guardar(): void {
    if (this.facturaSelected.items.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar por lo menos 1 item',
        life: 3000,
      });
      return;
    }
    this.facturaSelected.id = null;
    this.facturaSelected.items.forEach((item) => {
      item.id = null;
    });
    this.facturaSelected.totalFactura = this.facturaSelected.items.reduce(
      (valor_anterior, obj) => valor_anterior + obj.totalLinea!,
      0
    );
    this.facturaService.create(this.facturaSelected).subscribe((factura) => {
      if (factura) {
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Factura con exito!.',
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
    //console.log(this.facturaSelected);
  }

  calcularTotales(): void {
    this.totalComprobante = this.facturaSelected.items.reduce(
      (anterior, current) => anterior + current.totalLinea!,
      0
    );
    this.totalIva = this.totalComprobante / 11;
  }
}
