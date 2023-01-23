import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
      imports: [
        MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
