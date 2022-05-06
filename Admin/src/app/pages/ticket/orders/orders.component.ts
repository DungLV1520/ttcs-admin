import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})

/**
 * Ecommerce orders component
 */
export class OrdersComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  transactions: any;
  formData: FormGroup;
  submitted = false;
  customersData: any[];

  title: string;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
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
    this.breadCrumbItems = [
      { label: "Ticket" },
      { label: "List", active: true },
    ];

    this.transactions = [
      {
        id: "#SK2540",
        name: "Neal Matthews",
        date: "07 Oct, 2019",
        total: "$400",
        status: "Paid",
        payment: ["fab fa-cc-mastercard", "Mastercard"],
        index: 1,
      },
      {
        id: "#SK2541",
        name: "Jamal Burnett",
        date: "07 Oct, 2019",
        total: "$380",
        status: "Chargeback",
        payment: ["fab fa-cc-visa", "Visa"],
        index: 2,
      },
      {
        id: "#SK2542",
        name: "Juan Mitchell",
        date: "06 Oct, 2019",
        total: "$384",
        status: "Paid",
        payment: ["fab fa-cc-paypal", "Paypal"],
        index: 3,
      },
      {
        id: "#SK2543",
        name: "Barry Dick",
        date: "05 Oct, 2019",
        total: "$412",
        status: "Paid",
        payment: ["fab fa-cc-mastercard", "Mastercard"],
        index: 4,
      },
      {
        id: "#SK2544",
        name: "Ronald Taylor",
        date: "04 Oct, 2019",
        total: "$404",
        status: "Refund",
        payment: ["fab fa-cc-visa", "Visa"],
        index: 5,
      },
      {
        id: "#SK2545",
        name: "Jacob Hunter",
        date: "04 Oct, 2019",
        total: "$392",
        status: "Paid",
        payment: ["fab fa-cc-paypal", "Paypal"],
        index: 6,
      },
      {
        id: "#SK2546",
        name: "William Cruz",
        date: "03 Oct, 2019",
        total: "$374",
        status: "Paid",
        payment: ["fas fa-money-bill-alt", "COD"],
        index: 7,
      },
      {
        id: "#SK2547",
        name: "Dustin Moser",
        date: "02 Oct, 2019",
        total: "$350",
        status: "Paid",
        payment: ["fab fa-cc-mastercard", "Mastercard"],
        index: 8,
      },
      {
        id: "#SK2548",
        name: "Clark Benson",
        date: "01 Oct, 2019",
        total: "$345",
        status: "Refund",
        payment: ["fab fa-cc-visa", "Visa"],
        index: 9,
      },
    ];
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  navigateStation(): void {
    this.router.navigateByUrl("ticket/detail");
  }
  get form() {
    return this.formData.controls;
  }
  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const stationName = this.formData.get("stationName").value;
      const company = this.formData.get("company").value;
      const phone = this.formData.get("phone").value;
      const address = this.formData.get("address").value;
      const balance = this.formData.get("balance").value;

      this.customersData.push({
        id: this.customersData.length + 1,
        stationName,
        company,
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
   * @param contentEdit modal content
   */
  openModalEdit(contentEdit: any, checkEdit) {
    this.title = !checkEdit ? "Add Ticket" : "Update Ticket";
    this.modalService.open(contentEdit);
  }

  /**
   * Open modal
   * @param contentdelete modal content
   */
  openModalDelete(contentdelete: any) {
    this.modalService.open(contentdelete);
  }
}
