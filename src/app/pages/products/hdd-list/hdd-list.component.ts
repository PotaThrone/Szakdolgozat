import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {Hdd} from "../../../shared/model/hdd/hdd";

@Component({
  selector: 'app-hdd-list',
  templateUrl: './hdd-list.component.html',
  styleUrls: ['./hdd-list.component.scss']
})
export class HddListComponent {
  displayedColumns: string[] = ['brand', 'cableType', 'size', 'price', 'description'];
  hdds: Observable<Hdd[]>;

  constructor(private hddService: HddService) {
    this.hdds = hddService.getAll();
  }
}
