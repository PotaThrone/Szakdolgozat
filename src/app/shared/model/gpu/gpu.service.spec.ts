import { TestBed } from '@angular/core/testing';

import { GpuService } from './gpu.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('GpuService', () => {
  let service: GpuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(GpuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
