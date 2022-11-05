import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";
import { Customers, Education, Experience } from "./list-user.model";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import * as moment from "moment";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.scss"],
})
export class ListUserComponent implements OnInit {
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  formUser: FormGroup;
  submitted = false;
  customersData: Customers[];
  title!: string;
  currentpage: number;
  itemRole: any[];
  totalPage: number;
  idDelete: string;
  loading: boolean = true;
  itemSkill = [];
  isExperience = false;
  isEducation = false;
  isAddress = false;
  educationItems: Education[] = [new Education()];
  experienceItems: Array<Experience> = [new Experience()];
  checkRole: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "USER" }, { label: "LIST", active: true }];
    this.itemRole = [
      { id: "Applicant", name: "Applicant" },
      { id: "Recruiter", name: "Recruiter" },
    ];

    this.formUser = this.formBuilder.group({
      value: [""],
    });

    this.formData = this.formBuilder.group({
      id: [""],
      lastName: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      headline: ["", [Validators.required]],
      company: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      resume: ["", [Validators.required]],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      zipcode: ["", [Validators.required]],
      summary: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      role: ["", [Validators.required]],
      profile_image: ["", [Validators.required]],
      banner_image: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
    this.modelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((model) => {
        this.loading = true;
        if (model.value === "") {
          this._fetchData();
        } else {
          this.userService.searchUser(model).subscribe((data: any) => {
            this.customersData = data.body.payLoad;
            this.loading = false;
          });
        }
      });
  }

  changeDateCustomerUser(data: any): any[] {
    return (this.customersData = [
      ...data?.payLoad?.applicant?.map((data) => {
        data["status"] = "Applicant";
        return data;
      }),
      ...data?.payLoad?.recruiter?.map((data) => {
        data["status"] = "Recruiter";
        return data;
      }),
    ]);
  }

  private _fetchData() {
    this.userService.getUser().subscribe((data: any) => {
      this.changeDateCustomerUser(data.body);
      this.totalPage = data.body.count ?? 0;
      this.loading = false;
    });
  }

  get form() {
    return this.formData.controls;
  }

  onTagEdited(item: any) {}

  getObjData(formData?: any): any {
    const objData = {
      skills: this.itemSkill,
      name: {
        first: formData.firstName,
        last: formData.lastName,
      },
      experience: this.experienceItems?.map((data) => {
        data["date"] = {
          startdate: data.startdate,
          enddate: data.enddate,
        };
        delete data.startdate;
        delete data.enddate;
        return data;
      }),
      education: this.educationItems?.map((data) => {
        data["date"] = {
          startdate: data.startdate,
          enddate: data.enddate,
        };
        delete data.startdate;
        delete data.enddate;
        return data;
      }),
      address: {
        street: formData.street,
        city: formData.city,
        country: formData.country,
        zipcode: formData.zipcode,
        coordinates: {
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      },
      headline: formData.headline,
      company: formData.company,
      summary: formData.summary,
      resume: formData.resume,
      profile_image: formData.profile_image,
      banner_image: formData.banner_image,
      phone_number: formData?.phone?.toString(),
    };
    return objData;
  }

  saveCustomer() {
    const id = this.formData.value.id;
    if (id) {
      this.updateUser(id);
    } else {
      this.creatUser();
    }
    this.submitted = true;
  }

  creatUser() {
    const formData = this.formData.value;
    if (this.formData.valid) {
      if (this.checkRole === "Applicant") {
        if (
          this.checkItemsJobValid(this.experienceItems) &&
          this.checkItemsJobValid(this.educationItems)
        ) {
          this.creatUserApi(formData);
        }
      } else {
        this.creatUserApi(formData);
      }
    }
  }

  creatUserApi(formData: any): void {
    const objData = this.getObjData(formData);
    objData["email"] = formData.email;
    objData["password"] = formData.password;
    objData["role"] = formData.role.toLowerCase();
    delete objData["headLine"];
    delete objData["resume"];
    delete objData["profile_image"];
    delete objData["banner_image"];
    delete objData["summary"];
    if (this.checkRole !== "Applicant") {
      delete objData["skills"];
      delete objData["education"];
      delete objData["experience"];
    }
    this.loading = true;
    this.userService.createUser(objData).subscribe(
      () => {
        this.loading = false;
        this.toastService.success("Create user success!!!");
        this._fetchData();
        this.modalService.dismissAll();
      },
      (err) => {
        this.loading = false;
        this.toastService.error(err);
      }
    );
  }

  checkItemsJobValid(itemJob?: any): boolean {
    for (let i = 0; i < itemJob?.length; i++) {
      if (
        itemJob[i].startdate === undefined ||
        itemJob[i].startdate === "" ||
        itemJob[i].startdate === null ||
        itemJob[i].enddate === undefined ||
        itemJob[i].enddate === "" ||
        itemJob[i].enddate === null
      ) {
        return false;
      }
    }
    return true;
  }

  updateUser(id: string) {
    const formData = this.formData.value;
    delete formData.email;
    delete formData.password;
    if (this.checkRole === "Applicant") {
      delete formData.company;
      delete formData.phone;
    } else {
      delete formData.resume;
      delete formData.summary;
    }

    if (this.formData.valid) {
      if (this.checkRole === "Applicant") {
        if (
          this.checkItemsJobValid(this.experienceItems) &&
          this.checkItemsJobValid(this.educationItems)
        ) {
          this.updateUserApi(formData, id);
        }
      } else {
        this.updateUserApi(formData, id);
      }
    }
  }

  updateUserApi(formData: any, id: string) {
    const objData = this.getObjData(formData);
    this.loading = true;
    this.userService.updateUser(objData, id).subscribe(
      (data) => {
        this.toastService.success("Update user success!!!");
        this._fetchData();
        this.modalService.dismissAll();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastService.error(error);
      }
    );
  }

  deleteUser() {
    this.userService.deleteUser(this.idDelete).subscribe(
      () => {
        this.toastService.success("Delete user success!");
        this._fetchData();
      },
      (error) => {
        this.toastService.error(error);
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

  searchUser(): void {
    this.modelChanged.next(this.formUser.value);
  }

  /**
   * Open modal
   * @param content modal content
   */

  openModal(content?: any, checkEdit?: boolean, item?: any) {
    this.formData.reset();
    this.isExperience = true;
    this.isEducation = true;
    this.isAddress = true;
    this.submitted = false;
    this.itemSkill = [];
    this.educationItems = [];
    this.experienceItems = [];
    this.checkRole = "";
    this.title = !checkEdit ? "Add User" : "Update User";
    this.updateValidatorOpenForm();

    this.modalService.open(content, { size: "lg", backdrop: "static" });
    if (checkEdit) {
      this.checkRole = item?.status ? item?.status : "";
      this.formData.patchValue({
        id: item?.id,
        lastName: item?.name?.last,
        firstName: item?.name?.first,
        headline: item?.headline,
        street: item?.address?.street,
        city: item?.address?.city,
        latitude: item?.address?.coordinates?.latitude,
        longitude: item?.address?.coordinates?.longitude,
        country: item?.address?.country,
        zipcode: item?.address?.zipcode,
        summary: item?.summary,
        company: item?.company,
        phone: item?.phone_number,
        resume: item?.resume,
        role: item?.status,
        banner_image: item?.banner_image,
        profile_image: item?.profile_image,
      });

      this.itemSkill = item.skills;
      this.educationItems = item?.education?.map((item) => {
        item.startdate = moment(item?.date?.startdate)
          .toISOString()
          .substring(0, 10);
        item.enddate = moment(item?.date?.enddate)
          .toISOString()
          .substring(0, 10);
        return item;
      });

      this.experienceItems = item?.experience?.map((item) => {
        item.startdate = moment(item?.date?.startdate)
          .toISOString()
          .substring(0, 10);
        item.enddate = moment(item?.date?.enddate)
          .toISOString()
          .substring(0, 10);
        return item;
      });
    }
    this.updateValidator();
  }

  updateValidatorOpenForm(): void {
    if (this.title === "Update User") {
      this.formData?.get("email")?.clearValidators();
      this.formData?.get("email")?.updateValueAndValidity();
      this.formData?.get("password")?.clearValidators();
      this.formData?.get("password")?.updateValueAndValidity();
    } else {
      this.formData?.get("email")?.setValidators([Validators.required]);
      this.formData?.get("email")?.updateValueAndValidity();
      this.formData?.get("password")?.setValidators([Validators.required]);
      this.formData?.get("password")?.updateValueAndValidity();
    }
  }

  updateValidator(): void {
    if (this.checkRole === "Applicant") {
      this.formData?.get("company")?.clearValidators();
      this.formData?.get("company")?.updateValueAndValidity();
      this.formData?.get("phone")?.clearValidators();
      this.formData?.get("phone")?.updateValueAndValidity();
      this.formData?.get("resume")?.setValidators([Validators.required]);
      this.formData?.get("resume")?.updateValueAndValidity();
      this.formData?.get("summary")?.setValidators([Validators.required]);
      this.formData?.get("summary")?.updateValueAndValidity();
    } else {
      this.formData?.get("resume")?.clearValidators();
      this.formData?.get("resume")?.updateValueAndValidity();
      this.formData?.get("summary")?.clearValidators();
      this.formData?.get("summary")?.updateValueAndValidity();
      this.formData?.get("company")?.setValidators([Validators.required]);
      this.formData?.get("company")?.updateValueAndValidity();
      this.formData?.get("phone")?.setValidators([Validators.required]);
      this.formData?.get("phone")?.updateValueAndValidity();
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

  checkExperience(e: Event): void {
    this.isExperience = !this.isExperience;
  }

  checkEducation(e: Event): void {
    this.isEducation = !this.isEducation;
  }

  checkAddress(e: Event): void {
    this.isAddress = !this.isAddress;
  }

  addEducation(): void {
    this.educationItems?.push(new Education());
  }

  deleteEducation(index: number): void {
    this.educationItems?.splice(index, 1);
  }

  addExperience(): void {
    this.experienceItems?.push(new Experience());
  }

  deleteExperience(index: number): void {
    this.experienceItems?.splice(index, 1);
  }

  checkRoleSelect(e: any): void {
    this.checkRole = e.name;
  }

  getRowNumber(indexRow: number): number {
    return indexRow + 1 + (this.currentpage - 1) * this.totalPage;
  }

  showMap(): void {
    this.modalService.dismissAll();
    const latitude = this.form.latitude.value;
    const longitude = this.form.longitude.value;
    console.log(latitude);
    this.router.navigate(["/maps/google"], {
      queryParams: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  }
}
