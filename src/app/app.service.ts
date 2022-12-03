import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {BehaviorSubject, forkJoin, Observable, Subject} from "rxjs";
import {Results} from "./models/results";
import {User} from "./models/user";
import {Project} from "./models/project";
import {Gateways} from "./models/gateways";
import {Filter} from "./models/filter";
import {Reports} from "./models/reports";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  report$ = new Subject<Array<Reports>>();
  constructor(public env: EnvironmentService,
              private httpClient: HttpClient) { }

  getAllDropdowns(): Observable<Results<any>[]> {
    return forkJoin([
      this.httpClient.get<Results<User[]>>(`${this.env.apiUrl}users`),
      this.httpClient.get<Results<Project[]>>(`${this.env.apiUrl}projects`),
      this.httpClient.get<Results<Gateways[]>>(`${this.env.apiUrl}gateways`)
    ])
  };

  reports(filter:Filter): Observable<Results<Reports[]>> {
    return this.httpClient.post<Results<Reports[]>>(`${this.env.apiUrl}report`, filter);
  }

  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  random_rgb(): any {
    let o = Math.round, r = Math.random, s = 255;
    let color = 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s)+')';
    if (color === 'rgb(0, 0, 0)' || color === 'rgb(255, 255, 255)') {
      this.random_rgb();
    } else {
      return color;
    }
  }
}
