import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})


export class PasswordresetComponent implements OnInit{
  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }



  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.success = '';
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }else{
      console.log(this.resetForm);

      this.authService.forgetPass(this.resetForm.value).subscribe(data => {
        this.router.navigate(['/pages/email-verification'])
      },error => {
        this.error = error ? error : "";
      })
    }
  }
}
