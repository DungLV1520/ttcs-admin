import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Customers } from "../../user/list-user/list-user.model";
import { UserService } from "../../user/user.service";
import { JobService } from "../job.service";

@Component({
  selector: "app-list-job",
  templateUrl: "./list-job.component.html",
  styleUrls: ["./list-job.component.scss"],
})
export class ListJobComponent implements OnInit {
  modelChanged = new Subject<any>();
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  formUser: FormGroup;
  submitted = false;
  customersData: Customers[];
  title!: string;
  currentpage: number;
  totalPage: number;
  idDelete: string;
  loading: boolean = true;
  itemSkill = [];
  isAddress = false;
  easyApply: boolean;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private jobService: JobService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "JOB" }, { label: "LIST", active: true }];

    this.formUser = this.formBuilder.group({
      criterion: [""],
      latitude: [""],
      longitude: [""],
    });

    this.formData = this.formBuilder.group({
      id: [""],
      title: ["", [Validators.required]],
      company: ["", [Validators.required]],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      zipcode: ["", [Validators.required]],
      description: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      industry: ["", [Validators.required]],
      type: ["", [Validators.required]],
      function: ["", [Validators.required]],
      company_logo: ["", [Validators.required]],
    });

    this.currentpage = 1;
    this._fetchData();
    this.modelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((model) => {
        if (
          model.criterion === "" &&
          model.latitude === null &&
          model.longitude === null
        ) {
          this.loading = true;
          this._fetchData();
        } else if (
          model.criterion === "" ||
          model.criterion === undefined ||
          model.criterion === null ||
          model.latitude === "" ||
          model.latitude === undefined ||
          model.latitude === null ||
          model.longitude === null ||
          model.longitude === undefined ||
          model.longitude === ""
        ) {
          return;
        } else {
          this.loading = true;
          const objSearchData = {
            criterion: model.criterion,
            coordinates: {
              latitude: model.latitude,
              longitude: model.longitude,
            },
            page: 1,
          };
          this.jobService.searchJob(objSearchData).subscribe((data: any) => {
            this.customersData = data.payLoad;
            this.loading = false;
          });
        }
      });
  }

  private _fetchData() {
    this.jobService.getJob().subscribe((data: any) => {
      this.customersData = data.payLoad;
      this.totalPage = data.count ?? 0;
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
      title: formData.title,
      company: formData.company,
      description: formData.description,
      industry: formData.industry,
      type: formData.type,
      function: formData.function,
      company_logo: formData?.company_logo,
      easy_apply: this.easyApply ? this.easyApply : false,
    };
    return objData;
  }

  saveJob() {
    const id = this.formData.value.id;
    if (id) {
      this.updateJob(id);
    } else {
      this.creatJob();
    }
    this.submitted = true;
  }

  creatJob() {
    const formData = this.formData.value;
    if (this.formData.valid && this.itemSkill?.length > 0) {
      this.creatJobsApi(formData);
    }
  }

  creatJobsApi(formData: any): void {
    const objData = this.getObjData(formData);
    this.loading = true;
    this.jobService.createJob(objData).subscribe(
      () => {
        this.loading = false;
        this.toastService.success("Create job success!!!");
        this._fetchData();
        this.modalService.dismissAll();
      },
      (err) => {
        this.loading = false;
        this.toastService.error("Create job failed!!!");
      }
    );
  }

  updateJob(id: string) {
    const formData = this.formData.value;
    if (this.formData.valid) {
      this.updateJobApi(formData, id);
    }
  }

  updateJobApi(formData: any, id: string) {
    const objData = this.getObjData(formData);
    this.loading = true;
    this.jobService.updateJob(objData, id).subscribe(
      () => {
        this.toastService.success("Update job success!!!");
        this._fetchData();
        this.modalService.dismissAll();
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.toastService.error("Update job failed!!!");
      }
    );
  }

  deleteJob() {
    this.jobService.deleteJob(this.idDelete).subscribe(
      () => {
        this.toastService.success("Delete job success!");
        this._fetchData();
      },
      () => {
        this.toastService.error("Delete job failed!");
      }
    );
    this.modalService.dismissAll();
    this.submitted = true;
  }

  getPageJob(event): void {
    this.loading = true;
    this.currentpage = event;
    this.userService.getUser(event).subscribe((data: any) => {
      this.customersData = data.users;
      this.loading = false;
    });
  }

  searchJob(): void {
    this.modelChanged.next(this.formUser.value);
  }

  /**
   * Open modal
   * @param content modal content
   */

  openModal(content?: any, checkEdit?: boolean, item?: any) {
    this.formData.reset();
    this.isAddress = false;
    this.submitted = false;
    this.itemSkill = [];
    this.title = !checkEdit ? "Add Job" : "Update Job";

    this.modalService.open(content, { size: "lg", backdrop: "static" });
    if (checkEdit) {
      this.easyApply = item?.easy_apply;
      this.formData.patchValue({
        id: item?._id,
        title: item?.title,
        street: item?.address?.street,
        city: item?.address?.city,
        latitude: item?.address?.coordinates?.latitude,
        longitude: item?.address?.coordinates?.longitude,
        country: item?.address?.country,
        zipcode: item?.address?.zipcode,
        description: item?.description,
        company: item?.company,
        industry: item?.industry,
        type: item?.type,
        function: item?.function,
        company_logo: item?.company_logo,
      });

      this.itemSkill = item.skills;
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

  checkAddress(e: Event): void {
    this.isAddress = !this.isAddress;
  }

  checkEasyApply(e: any): void {
    this.easyApply = e;
  }

  getRowNumber(indexRow: number): number {
    return indexRow + 1 + (this.currentpage - 1) * this.totalPage;
  }
}
