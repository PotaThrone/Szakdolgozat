import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuListComponent } from './gpu-list.component';

describe('GpuListComponent', () => {
  let component: GpuListComponent;
  let fixture: ComponentFixture<GpuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpuListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
