import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loggedInUser?: firebase.default.User | null;
  title = 'Szakdolgozat';
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user =>{
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error =>{
      console.error(error);
      localStorage.setItem('user', JSON.stringify(null));
    });
  }


}
