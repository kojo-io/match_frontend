import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProjectAllGatewaysComponent } from './one-project-all-gateways.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Reports} from "../models/reports";
import {Observable} from "rxjs";

describe('OneProjectAllGatewaysComponent', () => {
  let component: OneProjectAllGatewaysComponent;
  let fixture: ComponentFixture<OneProjectAllGatewaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneProjectAllGatewaysComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneProjectAllGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
