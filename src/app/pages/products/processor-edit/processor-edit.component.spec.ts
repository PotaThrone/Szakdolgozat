import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorEditComponent } from './processor-edit.component';

describe('ProcessorEditComponent', () => {
  let component: ProcessorEditComponent;
  let fixture: ComponentFixture<ProcessorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
