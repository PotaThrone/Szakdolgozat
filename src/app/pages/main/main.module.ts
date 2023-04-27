import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {StarRatingModule} from "../../shared/util/star-rating/star-rating.module";
import {LineBreakModule} from "../../shared/util/line-break.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MainComponent}
    ]),
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    StarRatingModule,
    LineBreakModule,
    MatButtonModule,
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
