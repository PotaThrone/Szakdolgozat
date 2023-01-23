import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {User} from "../../shared/model/user/user";
import {UserService} from "../../shared/model/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {
    this.form = fb.group({
      email: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl(),
      lastName: new FormControl(),
      firstName: new FormControl(),
    });
  }

  register() {
    console.log(this.form.value);
    this.authService.signup(this.form.get('email')?.value, this.form.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.form.get('email')?.value,
        username: this.form.get('email')?.value.split('@')[0],
        firstname: this.form.get('firstName')?.value,
        lastname: this.form.get('lastName')?.value
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
        this.router.navigateByUrl('/main');

      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  goBack() {
  }
}
