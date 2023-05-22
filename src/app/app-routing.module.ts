import { CompraListComponent } from './erp/pages/compras/compra-list/compra-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './erp/pages/home-page/home-page.component';
import { ClientePageComponent } from './erp/pages/cliente-page/cliente-page.component';
import { ProductoPageComponent } from './erp/pages/producto-page/producto-page.component';
import { FacturaListComponent } from './erp/pages/facturas/factura-list/factura-list.component';
import { FacturaFormComponent } from './erp/pages/facturas/factura-form/factura-form.component';
import { ProveedorPageComponent } from './erp/pages/proveedor-page/proveedor-page.component';
import { CompraFormComponent } from './erp/pages/compras/compra-form/compra-form.component';
import { AjusteListComponent } from './erp/pages/ajusteStock/ajuste-list/ajuste-list.component';
import { AjusteFormComponent } from './erp/pages/ajusteStock/ajuste-form/ajuste-form.component';
import { ReporteVentaComponent } from './erp/pages/reportes/reporte-venta/reporte-venta.component';
import { ReporteCompraComponent } from './erp/pages/reportes/reporte-compra/reporte-compra.component';
import { ReporteArticulosComponent } from './erp/pages/reportes/reporte-articulos/reporte-articulos.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'cliente',
    component: ClientePageComponent,
  },
  {
    path: 'producto',
    component: ProductoPageComponent,
  },
  {
    path: 'proveedor',
    component: ProveedorPageComponent,
  },
  {
    path: 'factura-list',
    component: FacturaListComponent,
  },
  {
    path: 'factura-form/:id',
    component: FacturaFormComponent,
  },
  {
    path: 'compra-list',
    component: CompraListComponent,
  },
  {
    path: 'compra-form/:id',
    component: CompraFormComponent,
  },
  {
    path: 'ajuste-list',
    component: AjusteListComponent,
  },
  {
    path: 'ajuste-form/:id',
    component: AjusteFormComponent,
  },
  {
    path: 'reporte-ventas',
    component: ReporteVentaComponent,
  },
  {
    path: 'reporte-compras',
    component: ReporteCompraComponent,
  }
  ,
  {
    path: 'reporte-articulos',
    component: ReporteArticulosComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
