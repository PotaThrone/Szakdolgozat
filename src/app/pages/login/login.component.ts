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
  loading: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  async login() {
    this.loading = true;
    this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      console.error(error);
      this.loading = false;
    });
  }
}
