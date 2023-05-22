import { Component } from '@angular/core';
import { ReportesService } from 'src/app/erp/services/reportes.service';

interface Formatos {
  name: string;
  code: string;
}

@Component({
  selector: 'app-reporte-articulos',
  templateUrl: './reporte-articulos.component.html',
  styles: [
  ]
})
export class ReporteArticulosComponent {
  format: Formatos = { name: 'PDF', code: 'PDF' };
  formatos: Formatos[];

  constructor(private reportService: ReportesService) {
    this.formatos = [
      { name: 'PDF', code: 'PDF' },
      { name: 'XLSX', code: 'XLS' },
      { name: 'CSV', code: 'CSV' },
    ];
  }

  generateReport() {
    const reportName = 'Articulos'; // Reemplaza con el nombre del informe que deseas generar
    const parameters = {
      format: this.format.code
    };

    this.reportService
      .generatePostReport(reportName, parameters)
      .subscribe((response) => {
        this.downloadReport(response.body!, reportName, this.format.code);
      });
  }

  downloadReport(blob: Blob, reportName: string, format: string) {
    const dateName = new Date();
    const dia = dateName.getDate();
    const mes = dateName.getMonth() + 1; // Los meses en JavaScript son base 0, por eso se suma 1
    const anio = dateName.getFullYear();
    const hora = dateName.getTime();
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `${reportName}-${dia}/${mes}/${anio}:${hora}.${format}`;
    downloadLink.click();
  }
}
