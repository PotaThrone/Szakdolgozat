import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamListComponent } from './ram-list.component';

describe('RamListComponent', () => {
  let component: RamListComponent;
  let fixture: ComponentFixture<RamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
