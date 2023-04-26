import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LineBreakPipe} from "./line-break.pipe";



@NgModule({
  declarations: [
    LineBreakPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[LineBreakPipe]
})
export class LineBreakModule { }
