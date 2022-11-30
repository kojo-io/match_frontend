import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCompComponent } from './date-comp.component';

describe('DateCompComponent', () => {
  let component: DateCompComponent;
  let fixture: ComponentFixture<DateCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
