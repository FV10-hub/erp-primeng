import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FacturaService } from '../../../services/factura.service';
import { Router } from '@angular/router';
import { Factura } from '../../../interface/factura';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  providers: [MessageService, ConfirmationService],
})
export class FacturaListComponent implements OnInit {
  public viewFactura: boolean = false;
  public facturas: Factura[] = [];
  public totalComprobante: number = 0;
  public totalIva: number = 0;
  public facturaSelected: Factura = {
    id: 0,
    descripcion: '',
    observacion: '',
    nroFactura: '',
    items: [],
    cliente: {
      nombreCompleto: '',
      documento: '',
      telefono: '',
      chapa: '',
      createAt: new Date(),
      id: 0,
    },
    totalFactura: 0,
    createAt: new Date(),
  };

  public facturaToView: Factura = {
    id: 0,
    descripcion: '',
    observacion: '',
    nroFactura: '',
    items: [],
    cliente: {
      nombreCompleto: '',
      documento: '',
      telefono: '',
      chapa: '',
      createAt: new Date(),
      id: 0,
    },
    totalFactura: 0,
    createAt: new Date(),
  };

  constructor(
    private facturaService: FacturaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.facturaService.getFacturas().subscribe((facturasResponse) => {
      for (const factura of facturasResponse) {
        factura.createAt = new Date(factura.createAt as unknown as string); // Convertimos el campo de fecha de string a Date
      }
      facturasResponse.sort(this.orderDateDESC);
      this.facturas = facturasResponse;
    });
  }

  deleteFactura(id: number) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar la factura ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.facturaService.delete(id).subscribe((resp) => {
          console.log(resp);
        });
        this.facturas = this.facturas.filter((val) => val.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Factura Eliminada',
          life: 3000,
        });
      },
    });
  }

  view(factura: Factura) {
    this.totalComprobante = factura.totalFactura;
    this.totalIva = factura.totalFactura / 11;
    this.viewFactura = true;
    this.facturaToView = factura;
  }

  hideViewDialog() {
    this.viewFactura = false;
    this.facturaToView = {
      id: 0,
      descripcion: '',
      observacion: '',
      nroFactura: '',
      items: [],
      cliente: {
        nombreCompleto: '',
        documento: '',
        telefono: '',
        chapa: '',
        createAt: new Date(),
        id: 0,
      },
      totalFactura: 0,
      createAt: new Date(),
    };
  }

  // Función de comparación para ordenar en orden descendente
  orderDateDESC(a: Factura, b: Factura) {
    return b.createAt.getTime() - a.createAt.getTime();
  };
}
