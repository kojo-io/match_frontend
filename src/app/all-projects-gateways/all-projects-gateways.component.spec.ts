import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsGatewaysComponent } from './all-projects-gateways.component';

describe('AllProjectsGatewaysComponent', () => {
  let component: AllProjectsGatewaysComponent;
  let fixture: ComponentFixture<AllProjectsGatewaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjectsGatewaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProjectsGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
