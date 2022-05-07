import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TimelineComponent } from "./timeline/timeline.component";

const routes: Routes = [
  {
    path: "timeline",
    component: TimelineComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtiliytRoutingModule {}
