import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewCompany } from '../models/newCompany';
import { CompanyService } from '../service/company.service';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as _moment from 'moment';
import {DatePipe} from '@angular/common';
import { Sector } from '../models/Sector';

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
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class AddCompanyComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  minDate: Date;
  sectors: Sector[];

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) {sectordata},
    private alertService: AlertService,
    private companyService: CompanyService
  ) {
    this.sectors = sectordata;
    this.form = fb.group({
      name: ['', Validators.required],
      turnover: ['', Validators.required],
      ceo: ['', Validators.required],
      code: ['', Validators.required],
      sectorid: [this.sectors, Validators.required],
      description: [''],
      stockcode: ['', Validators.required],
      ipodate: ['', Validators.required]
      });
  }

  ngOnInit() {
    this.minDate = new Date();
  }

  save() {
    if (this.form.valid) {
      const company: NewCompany = {
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
      this.companyService.addCompany(company)
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
      this.dialogRef.close(company);
    }
}

close() {
    this.dialogRef.close();
}


}
