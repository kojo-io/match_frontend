import {inject, TestBed, waitForAsync} from '@angular/core/testing';

import { AppService } from './app.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Filter} from "./models/filter";
import {finalize} from "rxjs";

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
