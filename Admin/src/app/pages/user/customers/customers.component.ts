import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";

import { Customers } from "./customers.model";

import { customersData } from "./data";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})

/**
 * Ecomerce Customers component
 */
export class CustomersComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  term: any;
  title!: string;
  // page
  currentpage: number;
  selectValue: any[];
  totalPage: number;
  idDelete: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "User" }, { label: "List", active: true }];
    this.selectValue = [
      {
        check: false,
        name: "User",
      },
      {
        check: true,
        name: "Admin",
      },
    ];
    this.formData = this.formBuilder.group({
      id:[""],
      name: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
      isAdmin: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    this.currentpage = 1;

    this._fetchData();
  }

  private _fetchData() {
    this.userService.getUser().subscribe((data: any) => {
      this.customersData = data.users;
      this.totalPage = data.count;
    });
  }

  get form() {
    return this.formData.controls;
  }

  saveCustomer() {
    const id = this.formData.value.id;
    console.log(id);
    if (id !== undefined) {
      this.updateUser(id);
    } else {
      this.creatUser();
      console.log("aa");
    }
    this.submitted = true;
  }

  creatUser() {
    console.log(this.formData.value);
    this.formData.value.isAdmin = true;
    if (this.formData.valid) {
      this.userService.createUser(this.formData.value).subscribe(
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

  updateUser(id: string) {
    if (this.formData.valid) {
      this.userService.updateUser(this.formData.value, id).subscribe(
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

  deleteTrip() {
    console.log(this.idDelete);
    this.userService.deleteUser(this.idDelete).subscribe(
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

  getPageUser(event): void {
    console.log(event);
    this.currentpage = event;
    this.userService.getUser(event).subscribe((data: any) => {
      this.customersData = data.users;
    });
  }

  /**
   * Open modal
   * @param content modal content
   */

  openModal(content?: any, checkEdit?: boolean, item?: any) {
    console.log(item);
    this.title = !checkEdit ? "Add User" : "Update User";
    this.modalService.open(content);
    if (checkEdit) {
      this.formData.patchValue({
        id: item._id,
        name: item.name,
        email: item.email,
        isAdmin: item.isAdmin,
        password: item.password,
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
}
