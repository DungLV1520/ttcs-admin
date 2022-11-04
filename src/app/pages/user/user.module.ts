import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "../../shared/ui/ui.module";
import { Ng5SliderModule } from "ng5-slider";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbModalModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { NgSelectModule } from "@ng-select/ng-select";
import { ListUserComponent } from "./list-user/list-user.component";
import { UserRoutingModule } from "./user-routing.module";
import { TagInputModule } from "ngx-chips";
import { UiSwitchModule } from "ngx-ui-switch";

const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  maxFilesize: 100,
};

@NgModule({
  declarations: [ListUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    UIModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule,
    TagInputModule,
    UiSwitchModule,
    NgbDatepickerModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config,
    },
  ],
})
export class UserModule {}
