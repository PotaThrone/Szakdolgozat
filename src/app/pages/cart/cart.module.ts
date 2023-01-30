import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from "./cart.component";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: CartComponent,
    }]),
    MatTableModule,
    MatButtonModule,
    ModalModule.forRoot(),
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class CartModule {
}
