import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AdvancedSortableDirective } from './advancedtable/advanced-sortable.directive';
import { AdvancedtableComponent } from './advancedtable/advancedtable.component';
import { VehicleRoutingModule } from './vehicle-routing.module';

@NgModule({
  declarations: [AdvancedtableComponent, AdvancedSortableDirective],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class VehicleModule { }
