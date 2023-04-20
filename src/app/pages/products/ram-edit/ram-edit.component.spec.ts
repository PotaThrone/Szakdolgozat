import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamEditComponent } from './ram-edit.component';

describe('RamEditComponent', () => {
  let component: RamEditComponent;
  let fixture: ComponentFixture<RamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
