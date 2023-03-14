import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { PrimeNgModule } from '../primeng/prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    HomePageComponent,
    ClientePageComponent,
    ProductoPageComponent,
  ],
  imports: [CommonModule, PrimeNgModule,FormsModule],
  exports: [
    HomePageComponent,
    ClientePageComponent,
    ProductoPageComponent],
})
export class ErpModule {}
