import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { DropdownComponent } from './dropdown/dropdown.component';
import {fromEvent} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import { DateCompComponent } from './date-comp/date-comp.component';
import { AllProjectsGatewaysComponent } from './all-projects-gateways/all-projects-gateways.component';
import { AllProjectsGatewayComponent } from './all-projects-gateway/all-projects-gateway.component';
import {NgChartsModule} from "ng2-charts";
import { OneProjectGatewayComponent } from './one-project-gateway/one-project-gateway.component';


@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    DateCompComponent,
    AllProjectsGatewaysComponent,
    AllProjectsGatewayComponent,
    OneProjectGatewayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    //mvp-dropdown

    fromEvent(document, 'click')
      .subscribe({
        next: (_) => {
          if (!document.activeElement?.attributes.getNamedItem('mvp-dropdown')) {
            if (!document.activeElement?.attributes.getNamedItem('mvp-dropdown')) {
              const ele = document.getElementsByClassName(' mvp-droplist-container');
              for (let i = 0; i< ele.length;i++) {
                if (!ele.item(i)?.classList.contains('hidden')) {
                  ele.item(i)?.classList.add('hidden')
                }
              }
            }
          }
        }
      })
  }
}
