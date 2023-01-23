import { TestBed } from '@angular/core/testing';

import { HddService } from './hdd.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('HddService', () => {
  let service: HddService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(HddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
