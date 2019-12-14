import { Component, OnInit, Inject } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as _moment from 'moment';
import {DatePipe} from '@angular/common';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService} from '../service/company.service';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
import { Company } from '../models/Company';
import { Sector } from '../models/Sector';
import { UpdateCompany } from '../models/UpdateCompany';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class UpdateCompanyComponent implements OnInit {


  form: FormGroup;
  loading = false;
  submitted = false;
  updatecompany: Company;
  minDate: Date;
  sectors: Sector[];
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) {sectordata},
    @Inject(MAT_DIALOG_DATA) {update_company},
    private alertService: AlertService,
    private companyService: CompanyService
  ) {
    this.updatecompany = update_company;
    this.sectors = sectordata;
    this.form = fb.group({
      id: [this.updatecompany.id],
      name: [this.updatecompany.name, Validators.required],
      turnover: [this.updatecompany.turnover, Validators.required],
      ceo: [this.updatecompany.ceo, Validators.required],
      code: [this.updatecompany.code, Validators.required],
      sectorid: [this.updatecompany.sectorname, Validators.required],
      description: [this.updatecompany.description],
      stockcode: [this.updatecompany.stockcode, Validators.required],
      ipodate: [this.updatecompany.ipodate, Validators.required]
      });
   }

  ngOnInit() {
    this.minDate = new Date();
  }

  update() {
    if (this.form.valid) {
      const companyupdate: UpdateCompany = {
        id: this.form.value.id,
        name : this.form.value.name,
        turnover : this.form.value.turnover,
        ceo: this.form.value.ceo,
        code: this.form.value.code,
        sectorid: this.form.value.sectorid,
        description: this.form.value.description,
        stockcode: this.form.value.stockcode,
        ipodate: this.datePipe.transform(this.form.value.ipodate, 'yyyy-MM-dd'),
      };
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      this.loading = true;
      this.companyService.updateCompany(companyupdate)
      .pipe(first())
        .subscribe(
            data => {
              // tslint:disable-next-line:no-string-literal
              if (data['code'] === 200) {
                // tslint:disable-next-line:no-string-literal
                this.alertService.success(data['message']);
              }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
      this.dialogRef.close(companyupdate);
    }
}
close() {
  this.dialogRef.close();
}

}
