import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UtiliytRoutingModule } from "./utility-routing.module";
import { UIModule } from "../../shared/ui/ui.module";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";

import { TimelineComponent } from "./timeline/timeline.component";

@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    UtiliytRoutingModule,
    UIModule,
    NgbNavModule,
    CarouselModule,
  ],
})
export class UtilityModule {}
