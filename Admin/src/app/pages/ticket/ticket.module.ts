import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { TicketRoutingModule } from './ticket-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { DetailComponent } from './detail/detail.component';


const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [OrdersComponent,DetailComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
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
    NgbPaginationModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    }
  ]
})
export class TicketModule { }
