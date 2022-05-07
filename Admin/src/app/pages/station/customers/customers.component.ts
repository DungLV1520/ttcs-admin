import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyService } from "../../company/company.service";
import { StationService } from "../station.service";
import { Customers } from "./customers.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  term: any;
  title!: string;
  currentpage: number;
  idDelete: string;
  comapnyItem: any;
  loading:boolean = true;
  public totalPage: number;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private stationService: StationService,
    private companyService: CompanyService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Station" },
      { label: "List", active: true },
    ];

    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      address: ["", [Validators.required]],
      company: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
    this.getCompany();
  }

  getCompany() {
    this.companyService.getCompany().subscribe((company: any) => {
      console.log(company);
      this.comapnyItem = company.companies;
    });
  }

  private _fetchData() {
    this.stationService.getStation().subscribe((data: any) => {
      this.customersData = data.stations;
      this.totalPage = data.count;
      this.loading =false;
    });
  }

  get form() {
    return this.formData?.controls;
  }

  saveStation() {
    const id = this.formData.value._id;
    console.log(id);
    if (id !== undefined) {
      this.updateStation(id);
    } else {
      this.creatStation();
    }
    this.submitted = true;
  }

  creatStation() {
    if (this.formData.valid) {
      this.stationService.creatStation(this.formData.value).subscribe(
        (data) => {
          this.toastService.success("Create station success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Create station failed!");
        }
      );
    }
  }

  updateStation(id: string) {
    if (this.formData.valid) {
      this.stationService.updateStation(this.formData.value, id).subscribe(
        (data) => {
          this.toastService.success("Update station success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Update station failed!");
        }
      );
    }
  }

  deleteStation() {
    console.log(this.idDelete);
    this.stationService.deleteStation(this.idDelete).subscribe(
      (data) => {
        this.toastService.success("Delete station success!");
        this._fetchData();
      },
      (err) => {
        this.toastService.error("Delete station failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  getPageStation(event): void {
    this.loading =true;
    this.currentpage = event;
    this.stationService.getStation(event).subscribe((data: any) => {
      this.customersData = data.stations;
      this.loading =false;
    });
  }

  public getNameCompany(id: string) {
    for (let i = 0; i < this.comapnyItem.length; i++) {
      if (this.comapnyItem[i]._id === id) {
        console.log(this.comapnyItem[i].name);

        return this.comapnyItem[i].name;
      }
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content?: any, checkEdit?: boolean, item?: any) {
    console.log(item);
    this.title = !checkEdit ? "Add Station" : "Update Station";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        name: item.name,
        address: item.address,
        company: item.company,
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

  navigateDetail(): void {
    this.router.navigateByUrl("product-detail/1");
  }
}
