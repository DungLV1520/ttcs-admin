import { Component, HostListener, OnInit } from "@angular/core";
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
  private readonly MAX_FILE_SIZE = 5;
  formImage: FormData;
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formSearch: FormGroup;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  title!: string;
  currentpage: number;
  totalPage: number;
  idDelete: string;
  stationsData: any;
  vehicleData: any;
  loading: boolean = true;
  checkShow?: boolean = false;
  constructor(
    private companyService: CompanyService,
    private stationService: StationService,
    private vehicleService: VehicleService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
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
      image: [""],
    });

    this.formSearch = this.formBuilder.group({
      value: [""],
    });

    this.currentpage = 1;
    this._fetchData();
    this._fetchStation();
    this._fetchVehcle();
    this.modelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((model) => {
        this.loading = true;
        this.companyService.searchCompany(model).subscribe((data: any) => {
          this.customersData = data.companies;
          this.loading = false;
        });
      });
  }

  private _fetchData() {
    this.companyService.getCompany().subscribe((data: any) => {
      this.customersData = data.body.companies;
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
      this.formImage.append("description", this.formData.value.description);
      this.formImage.append("name", this.formData.value.name);
      this.formImage.append("station", this.formData.value.station);
      this.formImage.append("vehicles", this.formData.value.vehicles);
      this.companyService.createCompany(this.formImage).subscribe(
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
      this.formImage.append("description", this.formData.value.description);
      this.formImage.append("name", this.formData.value.name);
      this.formImage.append("station", this.formData.value.station);
      this.formImage.append("vehicles", this.formData.value.vehicles);
      this.companyService.updateCompany(this.formImage, id).subscribe(
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

  navigateStation(): void {
    this.router.navigateByUrl("ecommerce/product-detail/1");
  }

  searchCompany(): void {
    this.modelChanged.next(this.formSearch.value);
  }

  uploadImage($event: any) {
    const files: File[] = Array.from($event.target.files);
    this.formImage = new FormData();
    let fileSize = 0;
    for (const file of files) {
      fileSize += file.size / 1024 / 1024;
      if (fileSize > this.MAX_FILE_SIZE) {
        this.toastService.error("File size exceeds 5MB");
        return;
      }
      this.formImage.append("image", file, file.name);
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  image: string;
  openModal(content: any, checkEdit, item?: any) {
    this.image = item?.imageUrl;
    this.submitted = false;
    this.title = !checkEdit ? "Add company" : "Update company";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        name: item.name,
        description: item.description,
        station: item.station._id,
        vehicles: item.vehicles[0]?._id,
        image: item.imageKey,
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

  @HostListener("document:click", ["$event"])
  onclick(event) {
    if (event.target.matches(".editor-div")) {
      this.checkShow = !this.checkShow;
      console.log("aaa");
    }
  }
}
