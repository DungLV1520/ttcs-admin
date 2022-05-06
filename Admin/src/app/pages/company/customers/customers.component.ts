import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyService } from "../company.service";
import { Customers } from "./customers.model";
import { customersData } from "./data";

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

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Company" },
      { label: "List", active: true },
    ];

    this.formData = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      station: ["", [Validators.required]],
      vehicles: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
  }

  private _fetchData() {
    this.customersData = customersData;
    this.companyService.getCompany().subscribe((data:any) => {
      this.customersData = data.companies;
    })
  }
  get form() {
    return this.formData.controls;
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const companyName = this.formData.get("companyName").value;
      const email = this.formData.get("email").value;
      const phone = this.formData.get("phone").value;
      const address = this.formData.get("address").value;
      const balance = this.formData.get("balance").value;

      this.customersData.push({
        id: this.customersData.length + 1,
        companyName,
        email,
        phone,
        address,
        balance,
        rating: "4.3",
        date: currentDate + ":",
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any, checkEdit) {
    this.title = !checkEdit ? "Add Company" : "Update Company";
    this.modalService.open(content);
  }

  /**
   * Open modal
   * @param contentdelete modal content
   */
  openModalDelete(contentdelete: any) {
    this.modalService.open(contentdelete);
  }
  navigateStation(): void {
    this.router.navigateByUrl("ecommerce/product-detail/1");
  }
}
