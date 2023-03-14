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
      this.productoService.updateProducto(this.productoSelected).subscribe(
        (productoResponse) => {
          const productoActualizado = productoResponse.producto;
          console.log(productoResponse.producto);
          this.productos = this.productos.map((prod) => {
            if (prod.id === productoActualizado.id) {
              prod = productoActualizado;
            }
            return prod;
          });
          if (productoActualizado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Hecho',
              detail: 'Producto Actualizado',
              life: 3000,
            });
            this.productoDialog = false;
            //this.router.navigate(['/producto']);
          }
        },
        (err) => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error);
        }
      );
      this.getProductos();
      return;
    }

    console.log(JSON.stringify(this.productoSelected));
    this.productoService.create(this.productoSelected).subscribe(
      (productoResponse) => {
        this.productos.push(productoResponse.producto);
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Producto Creado',
          life: 3000,
        });
        this.productoDialog = false;
        this.getProductos();
        this.router.navigate(['/producto']);
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error);
      }
    );
  }
}
