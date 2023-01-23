import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
      imports: [
        MatFormFieldModule, FormsModule, ReactiveFormsModule, RouterModule,
        RouterTestingModule, MatInputModule, BrowserAnimationsModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
