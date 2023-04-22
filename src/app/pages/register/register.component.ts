import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {User} from "../../shared/model/user/user";
import {UserService} from "../../shared/model/user/user.service";
import {Router} from "@angular/router";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  hide = true;
  userList :User[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {
    this.userService.getAll().pipe(
      tap(users => this.userList = users),
    ).subscribe();
    this.form = fb.group({
      email: new FormControl(null,[Validators.required,
        Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
    }, {validator: [this.checkPasswords, this.checkEmail.bind(this)]});
  }

  checkEmail(group: FormGroup){
    let email = group.get('email')?.value;
    let user = this.userList.find(user => user.email === email);
    if(user) {
      return group.get('email')?.setErrors({accountTaken: true});
    }
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('rePassword')?.value;

    return pass === confirmPass ? null : group.get('rePassword')?.setErrors({ mustMatch: true });
  }

  register() {
    this.authService.signup(this.form.get('email')?.value, this.form.get('password')?.value).then(cred => {
      const user: User = {
        uid: cred?.user?.uid as string,
        email: this.form.get('email')?.value,
        username: this.form.get('email')?.value.split('@')[0],
        firstname: this.form.get('firstName')?.value,
        lastname: this.form.get('lastName')?.value
      };
      this.userService.create(user).then(_ => {
        this.router.navigateByUrl('/main');

      }).catch(error => {
      })
    }).catch(error => {
    });
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }
}
