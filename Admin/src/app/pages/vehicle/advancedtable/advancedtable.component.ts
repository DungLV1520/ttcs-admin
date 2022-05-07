import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { Vehicle } from "./advanced.model";
import { AdvancedService } from "./advanced.service";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./advanced-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VehicleService } from "../vehicle.service";

@Component({
  selector: "app-advancedtable",
  templateUrl: "./advancedtable.component.html",
  styleUrls: ["./advancedtable.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})

export class AdvancedtableComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  tableData: any[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<any[]>;
  total$: Observable<number>;
  editableTable: any;
  totalPage:number;
  currentpage:number;
  loading:boolean=true;
  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(
    public service: AdvancedService,
    private modalService: NgbModal,
    private vehicleService: VehicleService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Vehicle" },
      { label: "List", active: true },
    ];
    this.currentpage = 1;
    this._fetchData();
  }

  changeValue(i, id: string) {
    this.hideme[i] = !this.hideme[i];
    this._fetchDataSeat(id);
  }

  _fetchData() {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.tableData = data.vehicles;
      this.totalPage = data.count;
      this.loading = false;
    });
  }

  _fetchDataSeat(id: string) {
    this.loading = true;
    this.vehicleService.getVehicleSeatID(id).subscribe((data: any) => {
      this.editableTable = data.seat;
      this.loading =false;
    });
  }

  getPageVehicle(event): void {
    this.loading = true;
    this.currentpage = event;
    this.vehicleService.getVehicle(event).subscribe((data: any) => {
      this.tableData = data.stations;
      this.loading = false;
    });
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  /**
   * Open modal
   * @param contentdelete modal content
   */
  openModalDelete(contentdelete: any) {
    this.modalService.open(contentdelete);
  }
}
