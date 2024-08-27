import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccount } from '../../constant/DTOs';
import { LoginService } from '../../services/login.service';
import { SpinnerService } from 'projects/shared/spinner.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private toastr : ToastrService,
    public spinnerService: SpinnerService,
  ) { }

  registerForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        username: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.checkPassword }
    );
  }

  createAccount() {
    console.log(this.registerForm);

    const MODEL: CreateAccount = {
      email: this.registerForm.value['email'],
      role: 'user',
      username: this.registerForm.value['username'],
      password: this.registerForm.value['password'],
    };
    this.service.createUser(MODEL).subscribe((res) => {
      this.toastr.success("Register User Successfully")
      this.router.navigate(['/tasks']);
    });
  }

  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  };

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get username() {
    return this.registerForm.get("username")
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
