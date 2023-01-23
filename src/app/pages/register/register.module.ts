import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {path: '', component: RegisterComponent}
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class RegisterModule {
}
