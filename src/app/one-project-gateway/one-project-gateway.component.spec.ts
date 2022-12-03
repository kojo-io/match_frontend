import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProjectGatewayComponent } from './one-project-gateway.component';
import {AppService} from "../app.service";
import {AppComponent} from "../app.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OneProjectGatewayComponent', () => {
  let component: OneProjectGatewayComponent;
  let fixture: ComponentFixture<OneProjectGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneProjectGatewayComponent ],
      imports: [HttpClientTestingModule]
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
