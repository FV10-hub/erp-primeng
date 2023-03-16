import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../../services/factura.service';
import { Router } from '@angular/router';
import { Factura } from '../../../interface/factura';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
})
export class FacturaListComponent implements OnInit {
  public facturas: Factura[] = [];
  public facturaSelected: Factura = {
    id: 0,
    descripcion: '',
    observacion: '',
    items: [],
    cliente: {
      nombreCompleto: '',
      documento: '',
      telefono: '',
      createAt: new Date(),
      id: 0,
    },
    total: 0,
    createAt: new Date(),
  };

  constructor(private facturaService: FacturaService, private router: Router) {}
  ngOnInit(): void {
    this.facturaService.getFacturas().subscribe((facturasResponse) => {
      this.facturas = facturasResponse;
    });
  }

  deleteFactura(factura: Factura) {
    console.log('elimino');
  }
}
