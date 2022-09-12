import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QueryBuilderComponent} from "./query-builder/query-builder.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {JoinViewComponent} from "./join-view/join-view.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

const routes: Routes = [
  {path:'', component:MainLayoutComponent, children: [
      {path:'', redirectTo:'/', pathMatch:'full'},
      {path:'builder', component:QueryBuilderComponent},
      {path:'builder/join', component:JoinViewComponent},
      {path:'**', component:QueryBuilderComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
