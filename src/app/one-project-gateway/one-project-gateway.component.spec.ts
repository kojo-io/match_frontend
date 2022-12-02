import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProjectGatewayComponent } from './one-project-gateway.component';

describe('OneProjectGatewayComponent', () => {
  let component: OneProjectGatewayComponent;
  let fixture: ComponentFixture<OneProjectGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneProjectGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneProjectGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
