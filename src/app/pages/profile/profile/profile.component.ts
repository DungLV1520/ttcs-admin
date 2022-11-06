import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "../profile.service";
import { ChartType } from "./profile.model";
import { MustMatch } from "./validation.mustmatch";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  revenueBarChart: ChartType;
  statData;
  typesubmit: boolean;
  typesubmit1: boolean;
  FormPassword: FormGroup;
  FormProfile: FormGroup;
  loading: boolean = true;
  account: any;

  constructor(
    public formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.typesubmit = false;
    this.breadCrumbItems = [
      { label: "PROFILE" },
      { label: "SETTING", active: true },
    ];

    this.FormPassword = this.formBuilder.group(
      {
        oldPassword: ["", [Validators.required, Validators.minLength(6)]],
        newPassword: ["", Validators.required],
        confirmpwd: ["", Validators.required],
      },
      {
        validator: MustMatch("newPassword", "confirmpwd"),
      }
    );

    this.FormProfile = this.formBuilder.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
    });
    this.getProfile();
  }

  getProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe(
      (data) => {
        this.account = data.body.user;
        console.log(this.account);

        this.FormProfile.patchValue({
          lastName: this.account.name.last,
          firstName: this.account.name.first,
        });
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  get type() {
    return this.FormPassword.controls;
  }

  typeSubmit() {
    this.typesubmit1 = true;
    const password = {
      oldPassword: this.FormPassword.get("oldPassword").value,
      newPassword: this.FormPassword.get("newPassword").value,
    };
    this.loading = true;
    this.profileService.updatePassword(password).subscribe(
      () => {
        this.loading = false;
        this.toastrService.success("Update password success");
      },
      (err) => {
        this.toastrService.error(err);
        this.loading = false;
      }
    );
  }

  submitProfile() {
    this.typesubmit = true;
    this.loading = true;
    this.profileService.updateProfile(this.FormProfile.value).subscribe(
      () => {
        this.loading = false;
        this.toastrService.success("Update profile success");
      },
      (err) => {
        this.loading = false;
        this.toastrService.error(err);
      }
    );
  }
}
