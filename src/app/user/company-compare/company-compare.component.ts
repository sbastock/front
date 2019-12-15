import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { CompanyService } from '../../service/company.service';
import { AlertService } from '../../service/alert.service';
import { FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-company-compare',
  templateUrl: './company-compare.component.html',
  styleUrls: ['./company-compare.component.css']
})
export class CompanyCompareComponent implements OnInit {
  form: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  companies: Company[];

  constructor( private companyservice: CompanyService,
               private alertService: AlertService,
                ) {
                }

  ngOnInit() {
    
    this.getCompany();
  }


  getCompany() {

    this.companyservice.findCompanys().subscribe(data => {

      // tslint:disable-next-line:no-string-literal
      if (data['code'] === 200) {
        // tslint:disable-next-line:no-string-literal
        this.companies = data['data'];
        // tslint:disable-next-line:no-string-literal
      } else if (data['code'] === 404) {
        // tslint:disable-next-line:no-string-literal
        // tslint:disable-next-line:no-string-literal
        this.alertService.warn(data['message']);
      }

    },
      error => {
        this.alertService.error(error);
      });
  }

  generate_Map(){

  }
}
