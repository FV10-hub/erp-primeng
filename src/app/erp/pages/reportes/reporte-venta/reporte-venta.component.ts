import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/erp/services/reportes.service';

interface Formatos {
  name: string;
  code: string;
}

@Component({
  templateUrl: './reporte-venta.component.html',
  styles: [],
})
export class ReporteVentaComponent implements OnInit {
  desde?: Date;
  hasta?: Date;
  format: Formatos = { name: 'PDF', code: 'PDF' };
  formatos: Formatos[];

  constructor(private reportService: ReportesService) {
    this.formatos = [
      { name: 'PDF', code: 'PDF' },
      { name: 'XLSX', code: 'XLS' },
      { name: 'CSV', code: 'CSV' },
    ];
  }

  ngOnInit(): void {
    this.desde = new Date();
    this.hasta = new Date();
  }

  generateReport() {
    const reportName = 'Ventas'; // Reemplaza con el nombre del informe que deseas generar
    const parameters = {
      p_fecha_ini: this.formatoFecha(this.desde!),
      p_fecha_fin: this.formatoFecha(this.hasta!),
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

  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const diaFormatted = dia < 10 ? '0' + dia : dia.toString();
    const mesFormatted = mes < 10 ? '0' + mes : mes.toString();

    const fechaFormatted = diaFormatted + '/' + mesFormatted + '/' + anio;
    return fechaFormatted;
  }
}
