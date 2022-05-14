import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";
import { Customers } from "./customers.model";
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
  selectValue: any[];
  totalPage: number;
  idDelete: string;
  loading: boolean = true;
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
      id: [""],
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
    this.modelChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((model) => {
        this.userService.searchUser(model).subscribe((data: any) => {
          this.customersData = data.users;
        });
      });
  }

  private _fetchData() {
    this.userService.getUser().subscribe((data: any) => {
      this.customersData = data.users;
      this.totalPage = data.count;
      this.loading = false;
    });
  }

  get form() {
    return this.formData.controls;
  }

  saveCustomer() {
    const id = this.formData.value.id;
    if (id !== undefined && id !== null) {
      this.updateUser(id);
    } else {
      this.creatUser();
    }
    this.submitted = true;
  }

  creatUser() {
    console.log(this.formData.value);
    this.formData.value.isAdmin = true;
    if (this.formData.valid) {
      this.userService.createUser(this.formData.value).subscribe(
        (data) => {
          this.toastService.success("Create user success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Create user failed!");
        }
      );
    }
  }

  updateUser(id: string) {
    if (this.formData.valid) {
      this.userService.updateUser(this.formData.value, id).subscribe(
        (data) => {
          this.toastService.success("Update user success!");
          this._fetchData();
          this.modalService.dismissAll();
        },
        (err) => {
          this.toastService.error("Update user failed!");
        }
      );
    }
  }

  deleteUser() {
    console.log(this.idDelete);
    this.userService.deleteUser(this.idDelete).subscribe(
      (data) => {
        this.toastService.success("Delete user success!");
        this._fetchData();
      },
      (err) => {
        this.toastService.error("Delete user failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  getPageUser(event): void {
    this.loading = true;
    this.currentpage = event;
    this.userService.getUser(event).subscribe((data: any) => {
      this.customersData = data.users;
      this.loading = false;
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

  searchUser(): void {
    const user = {
      value: this.term,
    };
    this.modelChanged.next(user);
  }
}
