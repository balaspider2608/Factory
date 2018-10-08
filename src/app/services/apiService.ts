import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {  Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ApiService {
  private login: any;
  private _headers = new HttpHeaders();
   Params = new HttpParams();
    constructor(private _httpService : HttpClient , private http:Http) {
      this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
     }
    
    Get(apiString: string,postObject: any=""){
     
      return new Promise((resolve, reject) => {
        if(apiString!="UserLogin"){
          this._httpService.get(`${environment.baseUrl}` + apiString + '/',{headers: this._headers,params: this.Params})
          .subscribe((data: any)=>{
            resolve(JSON.parse(data));
          },
          error => {
            reject(null);
          }
          );
        }else{
          this.Params.append=postObject.UserName;
          this.Params.append=postObject.Password;
          this._httpService.get(`${environment.baseUrl}` + apiString + '/',{headers: this._headers,params: this.Params})
     .subscribe((data: any)=>{
      resolve(JSON.parse(data));
          },
          error => {
            reject(null);
          }
          );
        }
      });  
    }

    Post(apiString: string,postObject: any) : any{        
        return new Promise((resolve, reject) => {
            this._httpService.post(`${environment.baseUrl}/` + apiString + '/', postObject, { headers: this._headers })
              .subscribe(data => {
                resolve(data);
              },
              error => {
                reject(null);
              }
              );
          });
    }
}