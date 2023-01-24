import { Component } from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent {
   displayedColumns: string[] = ['brand', 'clock', 'memory', 'slot', 'price', 'description'];
   gpus: Observable<Gpu[]>;

   constructor(private gpuService: GpuService) {
     this.gpus = gpuService.getAll();
   }
}
