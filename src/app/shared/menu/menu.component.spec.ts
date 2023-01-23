import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [MatListModule, MatIconModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
