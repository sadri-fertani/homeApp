import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../srv/data.service';
import { IUser } from '../../models/IUser';
import { AuthService } from '../../srv/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, private router: Router, private srv: DataService, private auth: AuthService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: IUser): void {
    this.submitted = true;
    if (this.form.valid) {
      this.srv.signin(values).subscribe(
        data => {
          // Save signin Data in localstorage
          if (data.success) {
            this.auth.Token = data.token;
            localStorage.setItem('user', JSON.stringify(data.user));
            //this.router.navigate(['/admin', {}]);
          }
        },
        err => console.warn('ko', err)
      )
    }
  }
}