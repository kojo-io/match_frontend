import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {Reports} from "../models/reports";
import {Project} from "../models/project";
import {Gateways} from "../models/gateways";
import {AllProjectGateways, AllProjectGatewaysChild, DisplayData} from "../models/all-project-gateways";
import {Chart, ChartData} from "chart.js";
import {AppService} from "../app.service";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'mvp-one-project-all-gateways',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './one-project-all-gateways.component.html',
  styleUrls: ['./one-project-all-gateways.component.css']
})
export class OneProjectAllGatewaysComponent implements OnInit {
  @Input() reports!: Observable<Array<Reports>>;
  @Input() projects: Array<Project> = [];
  @Input() gateways: Array<Gateways> = [];
  @Input() selectedProject: string = '';
  project: string | undefined = '' ;
  selectedItem: string = '';
  allProjectGateways: Array<AllProjectGateways> = [];
  displayData!: DisplayData;
  chartOptions: any;
  chartLabels: any[] = [];
  chartData: ChartData<'doughnut'>;
  constructor(private cd: ChangeDetectorRef, private service: AppService) {
    Chart.register(ChartDataLabels);

    this.chartData = {
      labels: this.chartLabels,
      datasets: []
    }
  }

  ngOnInit(): void {
    this.reports.subscribe({
      next: (result) => {
        this.allProjectGateways = [];
        this.project = this.projects.find((project) => project.projectId === this.selectedProject)?.name;
        this.gateways.forEach((gateway) => {
          const list = result.filter(report => report.gatewayId === gateway.gatewayId);
          /**
           * transform report data for display
           */
          const data: AllProjectGateways = {
            name : gateway.name,

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
        this.chartLabels = this.gateways.map((gateway) => {
          const color = this.generateBgColor();
          return { name: gateway.name, color }
        });

        /**
         * chart final data output
         * */
        this.chartData = {
          datasets: [
            { data: this.allProjectGateways.map((gateway) => {
                return gateway.total / this.displayData.total * 100}),
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
