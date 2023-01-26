import { Component } from '@angular/core';
import {tap} from "rxjs";
import {Ram} from "../../../shared/model/ram/ram";
import {RamService} from "../../../shared/model/ram/ram.service";

@Component({
  selector: 'app-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss']
})
export class RamListComponent {
  rams: Ram[] = [];

  constructor(private ramService: RamService) {
    this.ramService.getAll().pipe(
      tap(rams => this.rams = rams),
    ).subscribe();
  }
}
