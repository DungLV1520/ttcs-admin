import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TicketService } from "../ticket.service";
import { ToastrService } from "ngx-toastr";
import { province } from "../../trip/customer-trip/trips";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  term: any;
  submitted = false;
  customersData: any[];
  idDelete: string;
  title: string;
  currentpage: number;
  provinceData: any[] = [];
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private ticketService: TicketService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Ticket" },
      { label: "List", active: true },
    ];
    this.currentpage = 1;
    this._province();
    this._fetchData();
  }
  dataItem: any;
  openModal(content: any, dataItem: any) {
    this.dataItem = dataItem;
    console.log(this.dataItem);

    this.modalService.open(content, { centered: true });
  }
  totalPage: number;
  loading: boolean = false;
  private _fetchData() {
    this.ticketService.getTicket().subscribe((data: any) => {
      this.customersData = data.bookings;
      this.totalPage = data.count;
      this.loading = false;
    });
  }

  deleteStation() {
    console.log(this.idDelete);
    this.ticketService.deleteTicket(this.idDelete).subscribe(
      (data) => {
        this.toastService.success("Delete ticket success!");
        this._fetchData();
      },
      (err) => {
        this.toastService.error("Delete ticket failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  getPageTicket(event): void {
    this.loading = true;
    this.currentpage = event;
    this.ticketService.getTicket(event).subscribe((data: any) => {
      this.customersData = data.bookings;
      this.loading = false;
    });
  }

  navigateStation(): void {
    this.router.navigateByUrl("ticket/detail");
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
  openModalDelete(contentdelete: any, id: string) {
    this.idDelete = id;
    this.modalService.open(contentdelete);
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

  private _province() {
    this.provinceData = province;
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
