import {Component, Input, OnInit} from '@angular/core';
import {Reports} from "../models/reports";
import {AllProjectGateways, AllProjectGatewaysChild, DisplayData} from "./all-project-gateways";
import {Project} from "../models/project";
import {Gateways} from "../models/gateways";
import {Dropdown} from "../dropdown/dropdown";
import {timer} from "rxjs";

@Component({
  selector: 'mvp-all-projects-gateways',
  templateUrl: './all-projects-gateways.component.html',
  styleUrls: ['./all-projects-gateways.component.css']
})
export class AllProjectsGatewaysComponent implements OnInit {
  @Input() reports: Array<Reports> = [];
  @Input() projects: Array<Project> = [];
  @Input() gateways: Array<Gateways> = [];
  selectedItem: string = '';
  allProjectGateways: Array<AllProjectGateways> = [];

  displayData!: DisplayData;
  constructor() { }

  ngOnInit(): void {

    this.projects.forEach((project) => {
      const list = this.reports.filter(report => report.projectId === project.projectId);

      /**
       * transform report data for display
       */
      const data: AllProjectGateways = {
        project : project.name,

        list: list.map((value) => {
          return <AllProjectGatewaysChild>{
            date: value.created,
            gateway: this.gateways.find((gateway) => gateway.gatewayId === value.gatewayId)?.name,
            transactionId: value.paymentId,
            amount: value.amount
          }
        }),

        total: list.reduce((total, item) => {
          return total + item.amount;
        }, 0)
      }

      this.allProjectGateways.push(data);
    });

    this.displayData = {
      list : this.allProjectGateways,
      total: this.allProjectGateways.reduce((total, data) => {
        return total + data.total
      }, 0)
    };

    console.log(this.projects, this.gateways, this.displayData);
  }

  collapse(item: string) {
    if (this.selectedItem === item) {
      this.selectedItem = '';
    } else {
      this.selectedItem = item;
      const scroll = timer(50).subscribe({
        next:(_) => {
          document.getElementById(item)?.scrollIntoView();
          scroll.unsubscribe();
        }
      });
    }
  }

}
