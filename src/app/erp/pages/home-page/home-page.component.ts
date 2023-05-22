import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ComprobantesPorMesDashDao } from '../../interface/comprobantesPorMesDashDao';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit {
  //dona
  data: any;
  chartOptions: any;
  //barra
  basicData: any;
  basicOptions: any;
  listaComprasPorMesDashDao?: ComprobantesPorMesDashDao[];
  listaMeses: string[] = [];
  listaTotales: number[] = [];
  listaMesesVentas: string[] = [];
  listaTotalesVentas: number[] = [];
  anio?: Date = new Date();
  isLoadingCompra: boolean = false;
  isLoadingVenta: boolean = false;

  constructor(private dashboardoService: DashboardService) {}

  ngOnInit() {
    //compras
    this.dashboardoService.getComprobantesPorMesDashDao('compras').subscribe((data) => {
      this.isLoadingCompra = true;
      if (data == null) return;
      for (const objeto of data) {
        this.listaMeses.push(objeto.mes);
        this.listaTotales.push(objeto.totalComprobante);
      }
      this.generateBarDashComprasPorMes(this.listaMeses, this.listaTotales);
      this.isLoadingCompra = false;
    });

    //ventas
    this.dashboardoService.getComprobantesPorMesDashDao('ventas').subscribe((data) => {
      this.isLoadingVenta = true;
      if (data == null) return;
      console.log(data)
      for (const objeto of data) {
        this.listaMesesVentas.push(objeto.mes);
        this.listaTotalesVentas.push(objeto.totalComprobante);
      }
      this.generateBarDashVentasPorMes(this.listaMesesVentas, this.listaTotalesVentas);
      this.isLoadingVenta = false;
    });

  }

  generateBarDashComprasPorMes(meses: string[], totales: number[]) {
    console.log(totales);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: meses,
      datasets: [
        {
          label: `Comrpas en ${this.anio!.getFullYear().toString()}`,
          data: totales,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgba(245, 40, 145, 0.8)',
            'rgba(231, 131, 183, 0.8)',
            'rgba(152, 112, 133, 0.8)',
            'rgba(107, 176, 174, 0.7)',
            'rgba(62, 220, 215, 0.7)',
            'rgba(0, 86, 84, 0.7)',
            'rgba(88, 247, 99, 0.7)',
            'rgba(232, 243, 157, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  generateBarDashVentasPorMes(meses: string[], totales: number[]) {
    this.data = {
      labels: meses,
      datasets: [
        {
          data: totales,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#F9E784','#E58F65','#D05353','#F1E8B8','7a6b17','#17687A','#6DD5EC','#0A93B1','#3DDBFF'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#F9E784','#E58F65','#D05353','#F1E8B8','7a6b17','#17687A','#6DD5EC','#0A93B1','#3DDBFF'],
        },
      ],
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
    };
  }

}
