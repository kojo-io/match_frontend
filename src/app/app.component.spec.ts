import {inject, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AppService} from "./app.service";
import {Filter} from "./models/filter";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [AppService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'match_frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('match_frontend');
  });

  it(`should render content 'Easily generate a report of your transactions'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.content')?.textContent).toContain('Easily generate a report of your transactions');
  });

  it('should retrieve all reports', inject([AppService, HttpTestingController], (service: AppService, httpMock: HttpTestingController)=>{
    const filter: Filter = {
      from: '2021/01/01',
      to: '2021/12/31'
    };
    service.reports(filter).subscribe();

    /**
     * check if one request was made to the given url
     * */
    const mockReq = httpMock.expectOne(`${service.env.apiUrl}report`);

    /**
     * check if request hasn't been cancelled
     * */
    expect(mockReq.cancelled).toBeFalsy();

    /**
     * check if request response type is a JSON response
     * */
    expect(mockReq.request.responseType).toEqual('json');
    /**
     * check if there are no outstanding request to be made
     * */
    httpMock.verify();
  }));
});
