import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VehicleService } from "../../vehicle/vehicle.service";
import { TripService } from "../trip.service";
import { Customers } from "./customers.model";
import { province } from "./trips";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: "app-customer-trip",
  templateUrl: "./customer-trip.component.html",
  styleUrls: ["./customer-trip.component.scss"],
})
export class CustomerTripComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  provinceData: any[] = [];
  term: any;
  currentpage: number;
  title: string;
  public totalPage: number;
  stationService: any;
  idDelete: string;
  customerDataVehicle: any;
  _number: number;
  loading: boolean = true;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripService,
    private vehicleService: VehicleService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "Trip" }, { label: "List", active: true }];

    this.formData = this.formBuilder.group({
      id: [""],
      from: ["", [Validators.required]],
      to: ["", [Validators.required]],
      guestCapacity: ["", Validators.required],
      startTime: ["", [Validators.required]],
      vehicle: ["", Validators.required],
      price: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
    this._province();
    this._fetchDataVehicle();
  }

  private _province() {
    this.provinceData = province;
  }
  private _fetchData() {
    this.tripService.getTrip().subscribe((data: any) => {
      this.customersData = data.trips;
      this.totalPage = data.count;
      this.loading = false;
    });
  }

  private _fetchDataVehicle() {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.customerDataVehicle = data.vehicles;
      console.log(this.customerDataVehicle);
    });
  }

  guestCapacity(event?: any) {
    this._number = event.guestCapacity;
    this.formData.patchValue({
      guestCapacity: this._number,
    });
  }
  get form() {
    return this.formData.controls;
  }

  getPageTrip(event): void {
    this.loading = true;
    this.currentpage = event;
    this.tripService.getTrip(event).subscribe((data: any) => {
      this.customersData = data.trips;
      this.loading = false;
    });
  }

  saveCustomer() {
    const id = this.formData.value.id;
    console.log(id);

    if (id !== undefined) {
      this.updateTrip(id);
    } else {
      this.creatTrip();
    }
    this.submitted = true;
  }

  creatTrip() {
    if (this.formData.valid) {
      this.tripService.creatTrip(this.formData?.value).subscribe(
        (data) => {
          this.toastService.success("Create trip success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Create trip failed!");
        }
      );
    }
  }

  updateTrip(id: string) {
    if (this.formData.valid) {
      this.tripService.updateTrip(this.formData.value, id).subscribe(
        (data) => {
          this.toastService.success("Update trip success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Update trip failed!");
        }
      );
    }
  }

  deleteTrip() {
    this.tripService.deleteTrip(this.idDelete).subscribe(
      (data) => {
        this.toastService.success("Delete trip success!");
        this._fetchData();
      },
      (err) => {
        this.toastService.error("Delete trip failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content?: any, checkEdit?: boolean, item?: any) {
    console.log(item);
    this.title = !checkEdit ? "Add Trip" : "Update Trip";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        from: item.from,
        to: item.to,
        guestCapacity: item.guestCapacity,
        vehicle: item.vehicle?._id,
        startTime: moment(item.startTime).format(),
        price: item.price,
      });
    } else {
      this.formData.reset();
    }
  }

  /**
   * Open modal
   * @param contentdelete modal content
   */
  openModalDelete(contentdelete: any, id: string) {
    this.idDelete = id;
    this.modalService.open(contentdelete);
  }

  navigateStation(): void {
    this.router.navigateByUrl("ecommerce/product-detail/1");
  }

  getProvince(from: any) {
    let id = 0;
    for (let i = 0; i < this.provinceData.length; i++) {
      if (this.provinceData[i].idProvince === from) {
        id = this.provinceData[i].name;
        break;
      }
    }
    return id;
  }

  getToProvince(to: any) {
    let id = 0;
    for (let i = 0; i < this.provinceData.length; i++) {
      if (this.provinceData[i].idProvince === to) {
        id = this.provinceData[i].name;
        break;
      }
    }
    return id;
  }
}
