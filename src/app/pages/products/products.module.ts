import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {GpuListComponent} from "./gpu-list/gpu-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import { HddListComponent } from './hdd-list/hdd-list.component';
import { MotherboardListComponent } from './motherboard-list/motherboard-list.component';
import { ProcessorListComponent } from './processor-list/processor-list.component';
import { RamListComponent } from './ram-list/ram-list.component';

const routes: Routes = [
  {path: '', component: ProductsComponent}
];

@NgModule({
  declarations: [
    ProductsComponent,
    GpuListComponent,
    HddListComponent,
    MotherboardListComponent,
    ProcessorListComponent,
    RamListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
})
export class ProductsModule {
}
