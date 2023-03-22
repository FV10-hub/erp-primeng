import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { PrimeNgModule } from '../primeng/prime-ng/prime-ng.module';
import { FacturaFormComponent } from './pages/facturas/factura-form/factura-form.component';
import { FacturaListComponent } from './pages/facturas/factura-list/factura-list.component';
import { ProveedorPageComponent } from './pages/proveedor-page/proveedor-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ClientePageComponent,
    ProductoPageComponent,
    FacturaFormComponent,
    FacturaListComponent,
    ProveedorPageComponent,
  ],
  imports: [CommonModule, PrimeNgModule, FormsModule],
  exports: [
    HomePageComponent,
    ClientePageComponent,
    ProductoPageComponent,
    FacturaFormComponent,
    FacturaListComponent,
    ProveedorPageComponent
  ],
})
export class ErpModule {}
