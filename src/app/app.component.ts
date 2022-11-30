import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {User} from "./models/user";
import {Project} from "./models/project";
import {Filter} from "./models/filter";
import {Gateways} from "./models/gateways";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'match_frontend';
  user : User;
  projects: Array<any> = [];
  gateways: Array<any> = [];
  filter: Filter;

  constructor(private service: AppService) {
    this.user = { firstName: '', lastName: '', email: '', userId: ''};
    this.filter = { from: '', to: '', projectId: '', gatewayId: '' }
  }

  ngOnInit(): void {
    this.service.getAllDropdowns()
      .subscribe({
      next: (results) => {
        this.user = results[0].data[0];

        this.projects = results[1].data.map((u: Project) => {
          return {id: u.projectId, value: u.name}
        });

        this.gateways = results[2].data.map((u: Gateways) => {
          return {id: u.gatewayId, value: u.name}
        });
      }
    })
  }

  getValue(event: any) {
    console.log(event);
  }
}
