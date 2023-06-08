import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Compra } from '../../../interface/compra';
import { CompraService } from '../../../services/compra.service';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CompraListComponent implements OnInit {
  public viewCompra: boolean = false;
  public compras: Compra[] = [];
  public cantidadItem: number = 0;
  public totalComprobante: number = 0;
  public totalIva: number = 0;
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

  public compraToView: Compra = {
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
      for (const factura of comprasResponse) {
        factura.createAt = new Date(factura.createAt as unknown as string); // Convertimos el campo de fecha de string a Date
      }
      comprasResponse.sort(this.orderDateDESC);
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

  view(compra: Compra) {
    this.totalComprobante = compra.totalCompra;
    this.totalIva = this.totalComprobante / 11;
    this.viewCompra = true;
    this.compraToView = compra;
  }

  hideViewDialog() {
    this.viewCompra = false;
    this.compraToView = {
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
  }

  orderDateDESC(a: Compra, b: Compra) {
    return b.createAt.getTime() - a.createAt.getTime();
  };
}
