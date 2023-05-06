import { Component, OnInit } from '@angular/core';
import { AjusteStock } from '../../../interface/ajuste-stock';
import { AjusteStockService } from '../../../services/ajuste-stock.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ajuste-list',
  templateUrl: './ajuste-list.component.html',
  providers: [MessageService, ConfirmationService],
})
export class AjusteListComponent implements OnInit {
  public viewAjusteStock: boolean = false;
  public ajusteStocks: AjusteStock[] = [];
  public ajusteStockSelected: AjusteStock = {
    id: 0,
    observacion: '',
    items: [],
    totalCosto: 0,
    createAt: new Date(),
  };

  public ajusteStockToView: AjusteStock = {
    id: 0,
    observacion: '',
    items: [],
    totalCosto: 0,
    createAt: new Date(),
  };

  constructor(
    private ajusteStockService: AjusteStockService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.ajusteStockService.getAjusteStocks().subscribe((ajusteStockResponse) => {
      this.ajusteStocks = ajusteStockResponse;
    });
  }

  deleteAjusteStock(id: number) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar la Ajuste de Stock ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.ajusteStockService.delete(id).subscribe((resp) => {
          console.log(resp);
        });
        this.ajusteStocks = this.ajusteStocks.filter((val) => val.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Ajuste de Stock Eliminada',
          life: 3000,
        });
      },
    });
  }

  view(ajusteStock: AjusteStock) {
    this.viewAjusteStock = true;
    this.ajusteStockToView = ajusteStock;
  }

  hideViewDialog() {
    this.viewAjusteStock = false;
    this.ajusteStockToView = {
      id: 0,
      observacion: '',
      items: [],
      totalCosto: 0,
      createAt: new Date(),
    };
  }
}
