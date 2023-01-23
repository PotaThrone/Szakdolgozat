import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
