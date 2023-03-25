import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { ChartModule } from 'primeng/chart';
import {DividerModule} from 'primeng/divider';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [],
  exports: [
    MenubarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    InputNumberModule,
    CalendarModule,
    DynamicDialogModule,
    AutoCompleteModule,
    ToolbarModule,
    ChartModule,
    DividerModule,
    CardModule
  ],
})
export class PrimeNgModule {}
