import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProfileService } from "src/app/pages/profile/profile.service";

@Component({
  selector: "app-lockscreen",
  templateUrl: "./lockscreen.component.html",
})
export class LockscreenComponent implements OnInit {
  resetToken: string;
  year: number = new Date().getFullYear();
  typesubmit: boolean;
  loading = true;
  FormPassword: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.activatedRoute.params.subscribe((paramsId) => {
      this.resetToken = paramsId.token;
    });
    this.FormPassword = this.formBuilder.group({
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.typesubmit = true;
    if (this.FormPassword.valid) {
      this.loading = true;
      this.profileService
        .resetPassword(this.FormPassword.value, this.resetToken)
        .subscribe(
          (data) => {
            this.toastrService.success("Update password success");
            this.router.navigateByUrl("/account/login");
            this.loading = false;
          },
          (err) => {
            this.loading = false;
            this.toastrService.error(err);
          }
        );
    }
  }
}
