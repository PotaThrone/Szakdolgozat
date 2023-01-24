import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {Processor} from "../../../shared/model/processor/processor";

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent {
  displayedColumns: string[] = ['brand', 'chipset', 'clockSpeed', 'core', 'price', 'description'];
  processors: Observable<Processor[]>;

  constructor(private processorService: ProcessorService) {
    this.processors = processorService.getAll();
  }
}
