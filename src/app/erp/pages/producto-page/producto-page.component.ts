import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interface/producto';

@Component({
  selector: 'app-producto-page',
  templateUrl: './producto-page.component.html',
  styles: [],
  providers: [MessageService, ConfirmationService],
})
export class ProductoPageComponent implements OnInit {
  public productos: Producto[] = [];
  public productoSelected: Producto = {
    id: 0,
    descripcion: '',
    codigoBarra: '',
    precio: 0,
    existencia: 0,
    createAt: new Date(),
  };
  public productoDialog: boolean = false;
  public submitted: boolean = false;

  constructor(
    private productoService: ProductosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  hideDialog() {
    this.productoDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.productoSelected = {
      id: 0,
      descripcion: '',
      codigoBarra: '',
      precio: 0,
      existencia: 0,
      createAt: new Date(),
    };
    this.submitted = false;
    this.productoDialog = true;
  }

  getProductos() {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  editProducto(producto: Producto) {
    this.productoSelected = { ...producto };
    this.productoDialog = true;
  }

  deleteProducto(producto: Producto) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar a ' + producto.descripcion + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.productoService
          .deleteProducto(producto.id)
          .subscribe((mensaje) => console.log(mensaje));
        this.productos = this.productos.filter((val) => val.id !== producto.id);
        this.productoSelected = {
          id: 0,
          descripcion: '',
          codigoBarra: '',
          precio: 0,
          existencia: 0,
          createAt: new Date(),
        };
        this.messageService.add({
          severity: 'error',
          summary: 'Hecho',
          detail: 'Producto Eliminado',
          life: 3000,
        });
      },
    });
  }

  guardar() {
    if (this.productoSelected.id > 0) {
      this.update();
      return;
    }
    this.create();
  }

  update(): void {
    this.productoService.updateProducto(this.productoSelected).subscribe(
      (productoResponse) => {
        const productoActualizado = productoResponse.producto;
        if (productoActualizado) {
          this.messageService.add({
            severity: 'success',
            summary: 'Hecho',
            detail: 'Producto Actualizado',
            life: 3000,
          });
          this.getProductos();
          this.productoDialog = false;
          //this.router.navigate(['/producto']);
        }
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error);
      }
    );
  }

  create(): void {
    this.productoService.create(this.productoSelected).subscribe(
      (productoResponse) => {
        console.log(JSON.stringify(productoResponse));
        if (productoResponse.hasOwnProperty('producto')) {
          this.productos.push(productoResponse.producto);
          this.messageService.add({
            severity: 'success',
            summary: 'Hecho',
            detail: 'Producto Creado',
            life: 3000,
          });
          this.getProductos();
          this.productoDialog = false;
          this.router.navigate(['/producto']);
          return;
        }
        this.messageService.add({
          severity: 'warn',
          summary: 'OOps!',
          detail: productoResponse.mensaje,
          life: 3000,
        });
        this.productoDialog = false;
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error);
      }
    );
  }
}
