import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products.component";
import {GpuListComponent} from "./gpu-list/gpu-list.component";
import {MatButtonModule} from "@angular/material/button";
import {HddListComponent} from './hdd-list/hdd-list.component';
import {MotherboardListComponent} from './motherboard-list/motherboard-list.component';
import {ProcessorListComponent} from './processor-list/processor-list.component';
import {RamListComponent} from './ram-list/ram-list.component';
import {MatCardModule} from "@angular/material/card";
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { GpuEditComponent } from './gpu-edit/gpu-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { HddEditComponent } from './hdd-edit/hdd-edit.component';
import { MotherboardEditComponent } from './motherboard-edit/motherboard-edit.component';
import { ProcessorEditComponent } from './processor-edit/processor-edit.component';
import { RamEditComponent } from './ram-edit/ram-edit.component';

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
    RamListComponent,
    CartPopupComponent,
    GpuEditComponent,
    HddEditComponent,
    MotherboardEditComponent,
    ProcessorEditComponent,
    RamEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [RouterModule],
})
export class ProductsModule {
}
