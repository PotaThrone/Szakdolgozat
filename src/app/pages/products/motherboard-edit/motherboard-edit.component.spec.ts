import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherboardEditComponent } from './motherboard-edit.component';

describe('MotherboardEditComponent', () => {
  let component: MotherboardEditComponent;
  let fixture: ComponentFixture<MotherboardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherboardEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotherboardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
