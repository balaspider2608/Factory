import { Component, OnInit, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatSelectionList, MatListOption,
MatOptionModule,MatIconModule} from '@angular/material';
import { NgbModal,NgbPopover,ModalDismissReasons,NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers']
  enableGraph=false;


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    
  }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  OpenDepDetail(){
    this.enableGraph =true;
  }
  }

