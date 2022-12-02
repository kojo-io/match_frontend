import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {Reports} from "../models/reports";
import {Project} from "../models/project";
import {Gateways} from "../models/gateways";
import {AllProjectGateways, AllProjectGatewaysChild, DisplayData} from "../models/all-project-gateways";

@Component({
  selector: '<mvp-one-project-gateway',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './one-project-gateway.component.html',
  styleUrls: ['./one-project-gateway.component.css']
})
export class OneProjectGatewayComponent implements OnInit {
  @Input() reports!: Observable<Array<Reports>>;
  @Input() projects: Array<Project> = [];
  @Input() gateways: Array<Gateways> = [];
  selectedItem: string = '';

  @Input() selectedGateway: string = '';
  @Input() selectedProject: string = '';
  gateWay: string | undefined = '' ;
  project: string | undefined = '' ;
  allProjectGateways: Array<AllProjectGateways> = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.reports.subscribe({
      next: (result) => {
        this.allProjectGateways = [];
        this.gateWay = this.gateways.find((gateWay) => gateWay.gatewayId === this.selectedGateway)?.name;
        this.project = this.projects.find((project) => project.projectId == this.selectedProject)?.name;

        /**
         * transform report data for display
         */
        const data: AllProjectGateways = {
          name: this.project ?? '',

          list: result.map((value) => {
            return <AllProjectGatewaysChild>{
              date: value.created,
              gateway: this.gateways.find((gateway) => gateway.gatewayId === value.gatewayId)?.name,
              transactionId: value.paymentId,
              amount: value.amount
            }
          }),

          total: result.reduce((total, item) => {
            return total + item.amount;
          }, 0)
        }

        this.allProjectGateways.push(data);
        this.cd.markForCheck();
      }
    })
  }

}
