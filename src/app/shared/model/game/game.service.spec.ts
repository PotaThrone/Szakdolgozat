import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
