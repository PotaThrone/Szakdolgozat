import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarRatingComponent} from "./star-rating.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    StarRatingComponent,
  ],
  exports: [
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class StarRatingModule { }
