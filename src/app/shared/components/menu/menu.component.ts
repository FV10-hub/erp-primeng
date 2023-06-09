import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-pie',
        routerLink: 'home'
      },
      {
        label: 'Ventas',
        icon: 'pi pi-chart-bar',
        items: [
          { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: 'cliente' },
          { separator: true },
          { label: 'Factura', icon: 'pi pi-fw pi-chart-line', routerLink: 'factura-list' },
          { separator: true },
        ],
      },
      {
        label: 'Compras',
        icon: 'pi pi-cart-plus',
        items: [
          { label: 'Proveedores', icon: 'pi pi-fw pi-user-minus', routerLink: 'proveedor' },
          { separator: true },
          { label: 'Compras', icon: 'pi pi-fw pi-truck', routerLink: 'compra-list' },
          { separator: true },
          { label: 'Articulos', icon: 'pi pi-fw pi-tag', routerLink: 'producto' },
          { separator: true },
          { label: 'Ajustes de Stock', icon: 'pi pi-fw pi-sort-alt', routerLink: 'ajuste-list' },
        ],
      },
      {
        label: 'Reportes',
        icon: 'pi pi-print',
        items: [
          { label: 'Ventas por Fechas', icon: 'pi pi-fw pi-file-export', routerLink: 'reporte-ventas' },
          { separator: true },
          { label: 'Compras por Fechas', icon: 'pi pi-fw pi-file-export', routerLink: 'reporte-compras' },
          { separator: true },
          { label: 'Listado de Articulos', icon: 'pi pi-fw pi-file-export', routerLink: 'reporte-articulos' },
          { separator: true },
        ],
      },
    ];
  }
}
