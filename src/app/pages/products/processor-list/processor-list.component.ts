import { Component } from '@angular/core';
import {tap} from "rxjs";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {Processor} from "../../../shared/model/processor/processor";

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent {
  processors: Processor[] = [];

  constructor(private processorService: ProcessorService) {
    this.processorService.getAll().pipe(
      tap(processors => this.processors = processors),
    ).subscribe();
  }
}
