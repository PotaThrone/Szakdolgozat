import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoriteComponent} from "./favorite.component";
import {RouterModule} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [FavoriteComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '', component: FavoriteComponent,
        }]),
        MatSnackBarModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ]
})
export class FavoriteModule {
}
