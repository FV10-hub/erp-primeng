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
          { label: 'Compras', icon: 'pi pi-fw pi-truck', routerLink: '' },
          { separator: true },
          { label: 'Articulos', icon: 'pi pi-fw pi-tag', routerLink: 'producto' },
        ],
      },
    ];
  }
}
