import { TestBed } from '@angular/core/testing';

import { RamService } from './ram.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('RamService', () => {
  let service: RamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(RamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
