import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiService';
import { User } from '../model/GOkModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user= new User();
  constructor(private _loginService: ApiService,private route: Router) { }

  ngOnInit() {
  }
  login() {

    if (!this.user.UserName || !this.user.Password) {
      alert("Please Enter Valid Credentials");
    }
    if (this.user.UserName && this.user.Password) {
      this._loginService.Get('UserLogin', this.user).then(data => {
        if (data) {
          this.route.navigate(['/home']);
        }else{
          alert("Please Enter Valid Credentials Or You are not authorized user")
        }
      }
      ).catch(data => {
        this.route.navigate(['/home']);
        // alert("Please Enter Valid Credentials Or You are not authorized user")
      });
    
    }
  }
  isValidForm() {
    if (this.user.UserName && this.user.Password) {
      return false;
    }
    else {
      return true;
    }
  }
}
