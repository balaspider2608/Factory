import { Component, OnInit, ViewChild, TemplateRef,ElementRef ,Renderer2} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatSelectionList, MatListOption,
  MatOptionModule,MatIconModule,MatInputModule} from '@angular/material';
  import { NgbModal,NgbPopover,ModalDismissReasons,NgbCollapseModule,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
  import { MatDialog } from '@angular/material';
  import { ApiService } from '../services/apiService';
  import { Product,Notification,Customchecklist,NotificationItem } from '../model/GOkModel';
  import { Router } from '@angular/router';
  import * as XLSX from 'xlsx';
  import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
  import {  Http, Response, Headers, RequestOptions } from '@angular/http';
  import { environment } from '../../environments/environment';
  type AOA = Array<Array<any>>;
  

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  lat =  12.9716;
  lng =  77.5946;
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string ;
  selectedCheckList : string;
  enableGraph=false;
  product:any;
  current_selected: any;
  selectedNotification: string="";
  notificationModel  = new Notification();
  CustomCheckListModel = new Customchecklist();
  notificationModeList = new Array<Notification>();
  @ViewChild('importFile') fileInput: any;
  @ViewChild('result') resultElement: ElementRef;
  modalReference: NgbModalRef;
  showQRCode : boolean = true;
  @ViewChild('content')
  private content: TemplateRef<any>;
  @ViewChild('content1')
  private content1: TemplateRef<any>;
  @ViewChild('content2')
  private content2: TemplateRef<any>;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers']
  Activity: any;
  selectedCustomerRadioList = new NotificationItem();
  ProductId: any;
  closeResult : any;
  NotificationType: {};
  data: any;
  constructor(private modalService: NgbModal,private _apiService: ApiService,private route: Router,private renderer: Renderer2,private _httpService : HttpClient,private http:Http) { 
    this.getProductList();
    this.getActivityList();
    //this.getNotificationList();
  }

  ngOnInit() {
  }
  openConfigure(content,prodId:any){
    this.ProductId =prodId;
    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

onSelection(e, v){
  this.current_selected =  v.selected.map(item => item.value);
}

getProductList(){
  this._apiService.Get('GetAllTrucks').then(data => {
    if (data) {
      this.product=data;
      console.log(this.product);
    }
  }
  ).catch(data => {
    console.log("Get product failed")
    // alert("Please Enter Valid Credentials Or You are not authorized user")
  });
}
getActivityList(){
  this._apiService.Get('GetAllMaintainenceActivities').then(data => {
    if (data) {
      this.Activity=data;
      console.log(this.Activity);
    }
  }
  ).catch(data => {
    console.log("Get product failed")
    // alert("Please Enter Valid Credentials Or You are not authorized user")
  });
}
getNotificationList(){
  this._apiService.Get('GetNotificationType').then(data => {
    if (data) {
      this.NotificationType=data;
      console.log(this.Activity);
    }
  }
  ).catch(data => {
    console.log("Get product failed")
    // alert("Please Enter Valid Credentials Or You are not authorized user")
  });
}
openConfigure1(content1,prodId:any){
  this.ProductId =prodId;
  this.modalReference = this.modalService.open(this.content1);
  this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
  }
  

radiotoggle(id:any,conf:string,prodId : any){
  var notification = id + conf;
  this.selectedNotification += notification + ","
}

saveConfig(prdId:any){
  this.selectedCheckList = "";
  for(let a=0;a<this.current_selected.length;a++){
    this.selectedCheckList += this.current_selected[a].ActivityId + ",";
  } 
  this.CustomCheckListModel.ProductId = prdId;
  this.CustomCheckListModel.CheckItemId = this.selectedCheckList;

  this.http.post(`${environment.baseUrl}` + 'SaveNotificationAndCheckList',this.getFormUrlEncoded(this.CustomCheckListModel), { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) }).subscribe(
    res => {
              this.modalReference.close();
              this.route.navigate(['/home']);
            },
            err => {
              this.modalReference.close();
              this.route.navigate(['/home']);
            }
  );
}


saveNotificationConfig(prdId:any){  

  this.selectedCustomerRadioList.ProductId = prdId;
  this.selectedCustomerRadioList.NotificationActivityId = this.selectedNotification;

  this.http.post(`${environment.baseUrl}` + 'SaveNotification',this.getFormUrlEncoded(this.selectedCustomerRadioList), { headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) }).subscribe(
    res => {
              this.modalReference.close();
              this.selectedNotification ="";
              this.route.navigate(['/home']);
            },
            err => {
              this.modalReference.close();
              this.selectedNotification ="";
              this.route.navigate(['/home']);
            }
  );
}

logout(){
  this.route.navigate(['/login']);
}

getFormUrlEncoded(toConvert) {
  const formBody = [];
  for (const property in toConvert) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(toConvert[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}


GetQR(chassisSeries, ChassisNumber){
this.value =chassisSeries + '-'+ChassisNumber;
return this.value;
}
render(e){
  console.log(e.result);
  let element :Element = this.renderer.createElement('p');
  element.innerHTML = e.result;
  this.renderElement(element);    
}

renderElement(element){
  for (let node of this.resultElement.nativeElement.childNodes) {
          this.renderer.removeChild(this.resultElement.nativeElement, node);
  }            
  this.renderer.appendChild(this.resultElement.nativeElement, element);
}  
openConfigureUpload(content2){
  this.modalService.open(this.content2);
}
handleFileSelect(e){}

onFileChange(evt:any){


const target = this.fileInput.nativeElement.files;

const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', sheetStubs: true });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */

      let dat = (XLSX.utils.sheet_to_json(ws, { raw: true, header: 1, blankrows: true }));
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { raw: true, header: 1, blankrows: true }));
console.log(this.data);
};
}
}