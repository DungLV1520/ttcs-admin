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

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  revenueBarChart: ChartType;
  statData;
  typesubmit: boolean;
  typesubmit1: boolean;
  FormPassword: FormGroup;
  FormProfile: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
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
    this.typesubmit = false;
    this.FormProfile = this.formBuilder.group({
      name: ["", Validators.required],
    });
    this.typesubmit = false;
    this.breadCrumbItems = [
      { label: "Profile" },
      { label: "Setting", active: true },
    ];
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
    this.profileService.updatePassword(password).subscribe(
      (data) => {
        this.toastrService.success("Update password success");
      },
      (err) => {
        this.toastrService.error("Update password failed");
      }
    );
  }

  submitProfile() {
    this.typesubmit = true;
    this.profileService.updateProfile(this.FormProfile.value).subscribe(
      (data) => {
        this.toastrService.success("Update profile success");
      },
      (err) => {
        this.toastrService.error("Update profile failed");
      }
    );
  }
}
