import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuEditComponent } from './gpu-edit.component';

describe('GpuEditComponent', () => {
  let component: GpuEditComponent;
  let fixture: ComponentFixture<GpuEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpuEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
