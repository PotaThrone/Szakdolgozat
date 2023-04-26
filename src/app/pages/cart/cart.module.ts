import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from "./cart.component";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";


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
        MatRadioModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ]
})
export class CartModule {
}
