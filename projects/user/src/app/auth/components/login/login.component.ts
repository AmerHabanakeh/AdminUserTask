import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { SpinnerService } from 'projects/shared/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private toaster: ToastrService,
    public spinnerService: SpinnerService,
  ) { }

  loginForm!: FormGroup;
  ngOnInit(): void {
    this.createForm()
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['user']
    })
  }


  login() {
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      this.router.navigate(['/tasks'])
      localStorage.setItem("token", res.token)
      this.toaster.success("Login Success", "Success")
    })
  }

  get email() {
    return this.loginForm.get("email");
  }


  get password() {
    return this.loginForm.get("password");
  }
}
