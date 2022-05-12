import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProfileService } from "src/app/pages/profile/profile.service";

@Component({
  selector: "app-lockscreen",
  templateUrl: "./lockscreen.component.html",
})
export class LockscreenComponent implements OnInit {
  year: number = new Date().getFullYear();

  FormPassword: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastrService: ToastrService
  ) {}
  typesubmit: boolean;
  ngOnInit(): void {
    this.FormPassword = this.formBuilder.group({
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.typesubmit = true;
    this.profileService.resetPassword(this.FormPassword).subscribe(
      (data) => {
        this.toastrService.success("Update password success");
      },
      (err) => {
        this.toastrService.error("Update password failed");
      }
    );
  }
}
