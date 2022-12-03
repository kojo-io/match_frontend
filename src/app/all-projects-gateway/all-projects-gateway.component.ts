import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Reports} from "../models/reports";
import {Project} from "../models/project";
import {Gateways} from "../models/gateways";
import {AllProjectGateways, AllProjectGatewaysChild, DisplayData} from "../models/all-project-gateways";
import {Observable, timer} from "rxjs";
import {Chart, ChartData, ChartOptions, ChartType} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {AppService} from "../app.service";

@Component({
  selector: 'mvp-all-projects-gateway',
  templateUrl: './all-projects-gateway.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./all-projects-gateway.component.css']
})
export class AllProjectsGatewayComponent implements OnInit {
  @Input() reports: Observable<Array<Reports>> | undefined;
  @Input() projects: Array<Project> = [];
  @Input() gateways: Array<Gateways> = [];
  @Input() selectedGateway: string = '';
  gateWay: string | undefined = '' ;
  selectedItem: string = '';
  allProjectGateways: Array<AllProjectGateways> = [];
  displayData: DisplayData;
  chartOptions: any;
  chartLabels: any[] = [];
  chartData: ChartData<'doughnut'>;
  constructor(private cd: ChangeDetectorRef, private service: AppService) {

    this.displayData = {
      list: [],
      total: 0
    }
    Chart.register(ChartDataLabels);

    this.chartData = {
      labels: this.chartLabels,
      datasets: []
    }
  }

  ngOnInit(): void {
    this.reports?.subscribe({
      next: (result) => {
        this.allProjectGateways = [];
        this.gateWay = this.gateways.find((gateWay) => gateWay.gatewayId === this.selectedGateway)?.name;
        this.projects.forEach((project) => {
          const list = result.filter(report => report.projectId === project.projectId);
          /**
           * transform report data for display
           */
          const data: AllProjectGateways = {
            name : project.name,

            list: list.map((value) => {
              return <AllProjectGatewaysChild>{
                date: value.created,
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
        this.cd.markForCheck();

        /**
        * create project chart labels with their color identifier
        * */
        this.chartLabels = this.projects.map((project) => {
          const color = this.generateBgColor();
          return { name: project.name, color }
        });

        /**
        * chart final data output
        * */
        this.chartData = {
          datasets: [
            { data: this.allProjectGateways.map((project) => {
                return project.total / this.displayData.total * 100}),
              backgroundColor: this.chartLabels.map((color) => color.color),
              label: 'project',
              datalabels: {
                anchor: 'center',
                align: 'center',
                color: 'white',
                formatter: (value: any, ctx: any) => {
                  return `${parseFloat(value).toFixed(2)}%`
                }
              }
            }
          ],
        }
      }
    })
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

  /**
   * random color generator
   * */
  generateBgColor(): any {
    const color = this.service.random_rgb();
    const check_color = this.chartLabels.find((u) => u.color === color);
    if (check_color) {
      this.generateBgColor();
    }
    return color;
  }
}
