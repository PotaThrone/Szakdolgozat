import { Component } from '@angular/core';
import {tap} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.scss']
})
export class MotherboardListComponent {
  motherboards: Motherboard[] = [];

  constructor(private motherboardService: MotherboardService) {
   this.motherboardService.getAll().pipe(
     tap(motherboards => this.motherboards = motherboards)
   ).subscribe();
  }
}
