import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HddEditComponent } from './hdd-edit.component';

describe('HddEditComponent', () => {
  let component: HddEditComponent;
  let fixture: ComponentFixture<HddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
