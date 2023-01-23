import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
      imports: [MatListModule, MatIconModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
