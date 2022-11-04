import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListJobComponent } from "./list-job/list-job.component";

const routes: Routes = [
  {
    path: "list-user",
    component: ListJobComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
