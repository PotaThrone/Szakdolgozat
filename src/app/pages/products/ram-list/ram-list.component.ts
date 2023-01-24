import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Ram} from "../../../shared/model/ram/ram";
import {RamService} from "../../../shared/model/ram/ram.service";

@Component({
  selector: 'app-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss']
})
export class RamListComponent {
  displayedColumns: string[] = ['brand', 'memorySize', 'slot', 'speed', 'price', 'description'];
  rams: Observable<Ram[]>;

  constructor(private ramService: RamService) {
    this.rams = ramService.getAll();
  }
}
