import { TestBed } from '@angular/core/testing';

import { MotherboardService } from './motherboard.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('MotherboardService', () => {
  let service: MotherboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(MotherboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
