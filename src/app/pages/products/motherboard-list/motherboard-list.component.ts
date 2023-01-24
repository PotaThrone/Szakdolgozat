import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.scss']
})
export class MotherboardListComponent {
  displayedColumns: string[] = ['brand', 'chipset', 'gpuSlots', 'hddCable','ramCount', 'ramSlots', 'price', 'description'];
  motherboards: Observable<Motherboard[]>;

  constructor(private motherboardService: MotherboardService) {
    this.motherboards = motherboardService.getAll();
  }
}
