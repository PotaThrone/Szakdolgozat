import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopProductsComponent} from "./top-products.component";
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {StarRatingModule} from "../../shared/util/star-rating/star-rating.module";

const routes: Routes = [
  {path: '', component: TopProductsComponent}
];

@NgModule({
  declarations: [
    TopProductsComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        StarRatingModule,
    ]
})
export class TopProductsModule { }
