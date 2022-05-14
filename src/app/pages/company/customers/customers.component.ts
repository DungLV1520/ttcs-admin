import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyService } from "../company.service";
import { Customers } from "./customers.model";
import { ToastrService } from "ngx-toastr";
import { StationService } from "../../station/station.service";
import { VehicleService } from "../../vehicle/vehicle.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
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
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private toastService: ToastrService,
    private stationService: StationService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Company" },
      { label: "List", active: true },
    ];

    this.formData = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required]],
      station: ["", [Validators.required]],
      vehicles: [""],
      description: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
    this._fetchStation();
    this._fetchVehcle();
    this.modelChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((model) => {
        this.companyService.searchCompany(model).subscribe((data: any) => {
          this.customersData = data.companies;
        });
      });
  }

  private _fetchData() {
    this.companyService.getCompany().subscribe((data: any) => {
      this.customersData = data.companies;
      this.totalPage = data.count;
      this.loading = false;
    });
  }

  private _fetchStation() {
    this.stationService.getStation().subscribe((data: any) => {
      this.stationsData = data.stations;
    });
  }

  private _fetchVehcle() {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.vehicleData = data.vehicles;
    });
  }

  get form() {
    return this.formData.controls;
  }

  getPageCompany(event): void {
    this.loading = true;
    this.currentpage = event;
    this.companyService.getCompany(event).subscribe((data: any) => {
      this.customersData = data.companies;
      this.loading = false;
    });
  }

  saveCompany() {
    const id = this.formData.value.id;
    if (id !== undefined && id !== null) {
      this.updateCompany(id);
    } else {
      this.createCompany();
    }
    this.submitted = true;
  }

  createCompany() {
    if (this.formData.valid) {
      this.companyService.createCompany(this.formData.value).subscribe(
        (data) => {
          this.toastService.success("Create company success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Create company failed!");
        }
      );
    }
  }

  updateCompany(id: string) {
    if (this.formData.valid) {
      this.companyService.updateCompany(this.formData.value, id).subscribe(
        (data) => {
          this.toastService.success("Update company success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Update company failed!");
        }
      );
    }
  }

  deleteCompany() {
    console.log(this.idDelete);
    this.companyService.deleteCompany(this.idDelete).subscribe(
      (data) => {
        this.toastService.success("Delete company success!");
        this._fetchData();
      },
      (err) => {
        this.toastService.error("Delete company failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any, checkEdit, item?: any) {
    this.submitted = false;
    console.log(item);
    this.title = !checkEdit ? "Add company" : "Update company";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        name: item.name,
        description: item.description,
        station: item.station._id,
        vehicles: item.vehicles[0]?._id,
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

  searchCompany(): void {
    const company = {
      value: this.term,
    };

    this.modelChanged.next(company);
  }
}
