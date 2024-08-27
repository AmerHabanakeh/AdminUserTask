import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerService } from 'projects/shared/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    public spinnerService: SpinnerService
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      role: 'admin',
    });
  }

  login() {
    this.authService.loginCall(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token);
        this.toastr.success('Login Successfully');
        this.router.navigate(['/tasks']);
      },
      
    );
  }

  get email() {
    return this.loginForm.get("email");
  }


  get password() {
    return this.loginForm.get("password");
  }
}
