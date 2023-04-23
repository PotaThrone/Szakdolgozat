import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PcBuilderComponent} from "./pc-builder.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
  {path: '', component: PcBuilderComponent}
];

@NgModule({
  declarations: [
    PcBuilderComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ]
})
export class PcBuilderModule { }
