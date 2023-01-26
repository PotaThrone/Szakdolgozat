import {Component} from '@angular/core';
import {tap} from "rxjs";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {Hdd} from "../../../shared/model/hdd/hdd";

@Component({
  selector: 'app-hdd-list',
  templateUrl: './hdd-list.component.html',
  styleUrls: ['./hdd-list.component.scss']
})
export class HddListComponent {
  hdds: Hdd[] = [];

  constructor(private hddService: HddService) {
    this.hddService.getAll().pipe(
      tap(hdds => this.hdds = hdds),
    ).subscribe();
  }
}
