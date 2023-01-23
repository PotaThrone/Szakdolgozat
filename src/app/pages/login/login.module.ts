import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {RouterModule, Routes} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  { path: '', component: LoginComponent }
];
@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class LoginModule { }
