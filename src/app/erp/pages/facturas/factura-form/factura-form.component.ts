import { ClientesService } from './../../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FacturaService } from '../../../services/factura.service';
import { Factura } from '../../../interface/factura';
import { Cliente } from '../../../interface/cliente';
import { ItemFactura } from '../../../interface/item-factura';
import { Producto } from '../../../interface/producto';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent implements OnInit {
  private id: string = '';
  public clienteDialog: boolean = false;
  public productoDialog: boolean = false;
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
    total: 0,
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
          total: 0,
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
    this.productoDialog = false;
    this.facturaSelected.items.push({id:0,cantidad:1,importe:producto.precio,producto});
  }

  openProductDialog() {
    this.productoDialog = true;
  }

  deleteItemProducto(productoToDelete: Producto) {
    this.facturaSelected.items = this.facturaSelected.items.filter(
      (productDelete) => productDelete.id !== productoToDelete.id
    );
  }
}
