import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { CompanyService } from '../../service/company.service';
import { AlertService } from '../../service/alert.service';
import { Sector } from '../../models/Sector';
import { FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sector-compare',
  templateUrl: './sector-compare.component.html',
  styleUrls: ['./sector-compare.component.css']
})
export class SectorCompareComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  companies: Company[];
  sectors: Sector[];

  constructor(private companyservice: CompanyService,
              private alertService: AlertService,
              ) { }

  ngOnInit() {
    this.getCompany();
    this.getSector();
  }

  getSector() {

    this.companyservice.findSectors().subscribe(data => {

        // tslint:disable-next-line:no-string-literal
        if (data['code'] === 200) {
        // tslint:disable-next-line:no-string-literal
        this.sectors = data['data'];
      // tslint:disable-next-line:no-string-literal
      } else if (data['code'] === 404) {
        // tslint:disable-next-line:no-string-literal
        this.alertService.warn(data['message']);
      }

    },
    error => {
      this.alertService.error(error);
          });
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
}
