import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsGatewayComponent } from './all-projects-gateway.component';

describe('AllProjectsGatewayComponent', () => {
  let component: AllProjectsGatewayComponent;
  let fixture: ComponentFixture<AllProjectsGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjectsGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProjectsGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
