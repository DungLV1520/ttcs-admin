import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AgmCoreModule } from "@agm/core";

import { UIModule } from "../../shared/ui/ui.module";

import { MapsRoutingModule } from "./maps-routing.module";
import { GoogleComponent } from "./google/google.component";

@NgModule({
  declarations: [GoogleComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    UIModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB5mFghgQ70frpE2Pntu0QUo9dt1Qak05M",
    }),
  ],
})
export class MapsModule {}
