import {TestBed} from '@angular/core/testing';

import {ForumService} from './forum.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
    });
    service = TestBed.inject(ForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
