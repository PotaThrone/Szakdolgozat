import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HddListComponent } from './hdd-list.component';

describe('HddListComponent', () => {
  let component: HddListComponent;
  let fixture: ComponentFixture<HddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HddListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
