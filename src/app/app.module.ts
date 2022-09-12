import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { JoinViewComponent } from './join-view/join-view.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {RouteReuseStrategy} from "@angular/router";
import {RouteStrategyService} from "./service/route-strategy.service";

@NgModule({
  declarations: [
    AppComponent,
    QueryBuilderComponent,
    JoinViewComponent,
    MainLayoutComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: RouteStrategyService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
