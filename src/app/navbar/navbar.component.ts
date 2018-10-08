import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/apiService';
import { NgbModal,NgbPopover,ModalDismissReasons,NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Notification: any;
  constructor(private route: Router,private _apiService: ApiService) { 


    this.getNotificationList();
  }

  ngOnInit() {
  }

  getNotificationList(){
    this._apiService.Get('GetAllNotifications').then(data => {
      if (data) {
        this.Notification=data;
      }
    }
    ).catch(data => {
      console.log("Get product failed")
      // alert("Please Enter Valid Credentials Or You are not authorized user")
    });
  }

  collapsed = true;
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }
     OpenDepDetail(){
      this.route.navigate(['/dashboard']);
    }
  }