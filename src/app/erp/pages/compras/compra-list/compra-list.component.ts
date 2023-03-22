import { Component, OnInit  } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Compra } from '../../../interface/compra';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CompraListComponent  implements OnInit {
  public compras: Compra[] = [];
  public compraSelected: Compra = {
    id: 0,
    descripcion: '',
    observacion: '',
    nroFactura: '',
    items: [],
    proveedor: {
      nombreCompleto: '',
      documento: '',
      telefono: '',
      createAt: new Date(),
      id: 0,
    },
    totalCompra: 0,
    createAt: new Date(),
  };

  constructor(
    private compraService: CompraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.compraService.getCompras().subscribe((comprasResponse) => {
      this.compras = comprasResponse;
    });
  }

  deleteCompra(id: number) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar la compra ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.compraService.delete(id).subscribe((resp) => {
          console.log(resp);
        });
        this.compras = this.compras.filter((val) => val.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Compra Eliminada',
          life: 3000,
        });
      },
    });
  }
}
