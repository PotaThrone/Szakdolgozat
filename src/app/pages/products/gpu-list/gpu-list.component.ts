import {Component} from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent {
  gpus: Gpu[] = [];

  constructor(private gpuService: GpuService) {
    gpuService.getAll().pipe(
      tap(gpus => this.gpus = gpus),
    ).subscribe();
  }
}
