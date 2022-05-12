
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { StationService } from "../../station/station.service";
import { VehicleService } from "../../vehicle/vehicle.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SeatService } from './orders.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  providers: [],
})
export class OrdersComponent implements OnInit {
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: any[];
  term: any;
  title!: string;
  currentpage: number;
  totalPage: number;
  idDelete: string;
  stationsData: any;
  vehicleData: any;
  loading: boolean = true;
  constructor(
    private modalService: NgbModal,
    private toastService: ToastrService,
    private seatService: SeatService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Seat" },
      { label: "List", active: true },
    ];

    this.currentpage = 1;
    this._fetchData();
  }

  getPageSeat(event): void {
    this.loading =true;
    this.currentpage = event;
    this.seatService.getSeat(event).subscribe((data: any) => {
      this.customersData = data.seats;
      this.loading = false;
    });
  }
  private _fetchData() {
    this.seatService.getSeat().subscribe((data: any) => {
      this.customersData = data.seats;
      this.totalPage = data.count;
      this.loading=false;
    });
  }
}

