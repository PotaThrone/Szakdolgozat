import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../environments/environment";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
      ],
      declarations: [
        AppComponent
      ],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Szakdolgozat'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Szakdolgozat');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Szakdolgozat app is running!');
  });
});
