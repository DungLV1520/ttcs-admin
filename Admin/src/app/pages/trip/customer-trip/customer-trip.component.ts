import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Customers } from "./customers.model";
import { customersData } from "./data";

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
  term: any;
  currentpage: number;
  title: string;


  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "Trip" }, { label: "List", active: true }];

    this.formData = this.formBuilder.group({
      username: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
      address: ["", [Validators.required]],
      balance: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
  }

  private _fetchData() {
    this.customersData = customersData;
  }

  get form() {
    return this.formData.controls;
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const fromStation = this.formData.get("fromStation").value;
      const toStation = this.formData.get("toStation").value;
      const startTime = this.formData.get("startTime").value;
      const price = this.formData.get("price").value;
      const address = this.formData.get("address").value;

      this.customersData.push({
        id: this.customersData.length + 1,
        fromStation,
        toStation,
        startTime,
        price,
        address,
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
    this.title = !checkEdit ? "Add Trip" : "Update Trip";
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
