import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {User} from "../../shared/model/user/user";
import {UserService} from "../../shared/model/user/user.service";
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {PcService} from "../../shared/model/pc/pc.service";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  isAdmin = false;
  form: FormGroup;
  hide = true;
  userList :User[] = [];
  isLoading = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router,
              private pcService: PcService) {
    this.userService.getAll().pipe(
      tap(users => this.userList = users),
    ).subscribe();
    this.form = fb.group({
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
    }, {validator: [this.checkPasswords, this.checkEmail.bind(this)]});
  }

  checkEmail(group: FormGroup){
    let email = group.get('email')?.value;
    let user;
    if(this.isAdmin){
      user = this.userList.find(user => user.email === 'admin@' + email);
    }else{
      user = this.userList.find(user => user.email === email);
    }
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
    this.isLoading = true;
    this.authService.signup(this.isAdmin ? 'admin@' + this.form.get('email')?.value : this.form.get('email')?.value, this.form.get('password')?.value).then(cred => {
      const user: User = {
        uid: cred?.user?.uid as string,
        email: this.form.get('email')?.value,
        username: this.form.get('email')?.value.split('@')[0],
        firstname: this.form.get('firstName')?.value,
        lastname: this.form.get('lastName')?.value
      };
      this.userService.create(user).then(() => {
        this.pcService.createEmptyPc();
        this.router.navigateByUrl('/main');
      }).catch(error => { console.error(error)});
    }).catch(error => {console.error(error)}).finally(() => this.isLoading = false);
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

  optionSelected(event: MatOptionSelectionChange, role: string) {
    if(event.isUserInput){
      this.isAdmin = role === 'admin';
      const emailControl = this.form.get('email');
      if(this.isAdmin){
        emailControl?.clearValidators();
        emailControl?.setErrors(null);
        emailControl?.setValidators([Validators.required, Validators.pattern(/([\w-]+\.)+[\w-]{2,4}$/)]);
        emailControl?.updateValueAndValidity();
      }else{
        emailControl?.clearValidators();
        emailControl?.setErrors(null);
        emailControl?.setValidators([Validators.required, Validators.pattern(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)]);
        emailControl?.updateValueAndValidity();
      }
    }
  }
}
