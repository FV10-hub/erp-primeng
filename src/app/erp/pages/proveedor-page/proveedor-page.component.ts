import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Proveedor } from '../../interface/proveedor';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedor-page',
  templateUrl: './proveedor-page.component.html',
  providers: [MessageService, ConfirmationService],
})
export class ProveedorPageComponent implements OnInit {
  public proveedores: Proveedor[] = [];
  public proveedorSelected: Proveedor = {
    nombreCompleto: '',
    documento: '',
    telefono: '',
    createAt: new Date(),
    id: 0,
  };
  public proveedorDialog: boolean = false;
  public submitted: boolean = false;

  constructor(
    private proveedorService: ProveedoresService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  hideDialog() {
    this.proveedorDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.proveedorSelected = {
      nombreCompleto: '',
      documento: '',
      telefono: '',
      createAt: new Date(),
      id: 0,
    };
    this.submitted = false;
    this.proveedorDialog = true;
  }

  getProveedores() {
    this.proveedorService.getProveedores().subscribe((proveedores) => {
      this.proveedores = proveedores;
    });
  }

  editProveedor(proveedor: Proveedor) {
    this.proveedorSelected = { ...proveedor };
    this.proveedorDialog = true;
  }

  deleteProveedor(proveedor: Proveedor) {
    this.confirmationService.confirm({
      message:
        'Esta seguro que desea eliminar a ' + proveedor.nombreCompleto + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.proveedorService
          .deleteProveedor(proveedor.id)
          .subscribe((mensaje) => console.log(mensaje));
        this.proveedores = this.proveedores.filter(
          (val) => val.id !== proveedor.id
        );
        this.proveedorSelected = {
          nombreCompleto: '',
          documento: '',
          telefono: '',
          createAt: new Date(),
          id: 0,
        };
        this.messageService.add({
          severity: 'error',
          summary: 'Hecho',
          detail: 'Proveedor Eliminado',
          life: 3000,
        });
      },
    });
  }

  guardar() {
    if (this.proveedorSelected.id > 0) {
      this.proveedorService.updateProveedor(this.proveedorSelected).subscribe(
        (proveedorActualizado) => {
          if (proveedorActualizado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Hecho',
              detail: 'Proveedor Actualizado',
              life: 3000,
            });
            this.proveedorDialog = false;
            this.router.navigate(['/proveedor']);
          }
        },
        (err) => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error);
        }
      );
      this.proveedores = this.proveedores.map((prov) => {
        if (prov.id === this.proveedorSelected.id) {
          prov = this.proveedorSelected;
          return prov;
        }
        return prov;
      });
      return;
    }

    this.proveedorService.create(this.proveedorSelected).subscribe(
      (proveedor) => {
        this.proveedores.push(proveedor);
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Proveedor Creado',
          life: 3000,
        });
        this.proveedorDialog = false;
        this.getProveedores();
        this.router.navigate(['/proveedor']);
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error);
      }
    );
  }
}
