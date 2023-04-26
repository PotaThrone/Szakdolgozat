import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  async login() {
    this.isLoading = true;
    this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value).then(() => {
      this.router.navigateByUrl('/main');
    }).catch(() => {
      this.form.setErrors({accountInvalid: true});
    }).finally(() => this.isLoading = false);
  }
}
