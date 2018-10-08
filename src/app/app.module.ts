import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ApiService } from './services/apiService';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule }  from '@angular/router';
import { appRoutes } from './app.routing';
import {MatButtonModule, MatCheckboxModule, MatMenuModule,MatSelectModule,MatOptionModule, MatListModule
,MatIconModule,MatInputModule } from '@angular/material';
import {NgbModule,NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { CustomGraphComponent } from './custom-graph/custom-graph.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    ProductTableComponent,
    CustomGraphComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,NgbModule.forRoot(),
    HttpModule,MatButtonModule, MatCheckboxModule,MatMenuModule,
    MatOptionModule,MatInputModule,
    MatSelectModule,
    MatListModule,NgxQRCodeModule,NgQRCodeReaderModule,
    MatIconModule,NgbCollapseModule,
    RouterModule.forRoot(appRoutes, { useHash: true})
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
