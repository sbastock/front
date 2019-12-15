import { Component, OnInit } from '@angular/core';
import { Sector } from '../models/Sector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  sectors: Sector[];

  constructor() {
  }

  ngOnInit() {
  }

  // usertabClick(tab) {
  //   if (tab.index === 1) {
  //     this.getCompany();
  //   }
  // }

  

  // getSector() {

  //   this.companyservice.findSectors().subscribe(data => {

  //     // tslint:disable-next-line:no-string-literal
  //     if (data['code'] === 200) {
  //       // tslint:disable-next-line:no-string-literal
  //       this.sectors = data['data'];
  //       // tslint:disable-next-line:no-string-literal
  //     } else if (data['code'] === 404) {
  //       // tslint:disable-next-line:no-string-literal
  //       this.alertService.warn(data['message']);
  //     }

  //   },
  //     error => {
  //       this.alertService.error(error);
  //     });
  // }

}
