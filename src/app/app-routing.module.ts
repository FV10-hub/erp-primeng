import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './erp/pages/home-page/home-page.component';
import { ClientePageComponent } from './erp/pages/cliente-page/cliente-page.component';
import { ProductoPageComponent } from './erp/pages/producto-page/producto-page.component';
import { FacturaListComponent } from './erp/pages/facturas/factura-list/factura-list.component';
import { FacturaFormComponent } from './erp/pages/facturas/factura-form/factura-form.component';
import { ProveedorPageComponent } from './erp/pages/proveedor-page/proveedor-page.component';

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
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
