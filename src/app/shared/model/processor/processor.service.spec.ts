import { TestBed } from '@angular/core/testing';

import { ProcessorService } from './processor.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('ProcessorService', () => {
  let service: ProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(ProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
