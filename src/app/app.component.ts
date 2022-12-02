import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {User} from "./models/user";
import {Project} from "./models/project";
import {Filter} from "./models/filter";
import {Gateways} from "./models/gateways";
import {Reports} from "./models/reports";
import {Dropdown} from "./dropdown/dropdown";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'match_frontend';
  user : User;
  projects: Array<Project> = [];
  transformedProjectList: Array<Dropdown> = [];
  gateways: Array<Gateways> = [];
  transformedGatewaysList: Array<Dropdown> = [];
  filter: Filter;

  initialReportData: Array<Reports> = [];
  reports = new BehaviorSubject(this.initialReportData);

  constructor(private service: AppService) {
    this.user = { firstName: '', lastName: '', email: '', userId: ''};
    this.filter = { from: '', to: '', projectId: '', gatewayId: '' }
  }

  ngOnInit(): void {
    this.service.getAllDropdowns()
      .subscribe({
      next: (results) => {
        this.user = results[0].data[0];

        this.projects = results[1].data;
        this.transformedProjectList =  this.projects.map((u: Project) => {
          return <Dropdown>{id: u.projectId, name: u.name}
        });

        this.transformedProjectList.push({
          id: '',
          name: 'All projects'
        });

        this.gateways = results[2].data;
        this.transformedGatewaysList = this.gateways.map((u: Gateways) => {
          return <Dropdown>{id: u.gatewayId, name: u.name}
        });

        this.transformedGatewaysList.push({
          id: '',
          name: 'All gateways'
        });
      }
    })
  }

  getReport() {
    this.service.reports(this.filter).subscribe({
      next: (result) => {
        this.initialReportData = result.data;
        this.reports.next(result.data);
      }
    })
  }

  clear() {
    this.reports.next([])
  }
}
