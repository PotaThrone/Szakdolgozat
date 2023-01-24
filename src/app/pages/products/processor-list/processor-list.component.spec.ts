import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorListComponent } from './processor-list.component';

describe('ProcessorListComponent', () => {
  let component: ProcessorListComponent;
  let fixture: ComponentFixture<ProcessorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
