import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../models/Company';
import { CompanyService } from '../../service/company.service';
import { AlertService } from '../../service/alert.service';
import { Exchange } from 'src/app/models/Exchange';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { first } from 'rxjs/operators';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as _moment from 'moment';
import {DatePipe} from '@angular/common';
import { ExchangeCompany } from 'src/app/models/ExchangeCompany';
import { StockService } from 'src/app/service/stock.service';
import { SeriesData } from 'src/app/models/SeriesData';

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
  selector: 'app-company-compare',
  templateUrl: './company-compare.component.html',
  styleUrls: ['./company-compare.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class CompanyCompareComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  exchanges: Exchange[];
  excompanies: ExchangeCompany[];
  showExCompany: boolean;
  seriesData: SeriesData[];

  constructor( private companyservice: CompanyService,
               private alertService: AlertService,
               private stockService: StockService,
               private datePipe: DatePipe,
               private fb: FormBuilder
                ) {
                  this.form = fb.group({
                    // exchangeid: ['', Validators.required],
                    comapnycodeA: ['', Validators.required],
                    comapnycodeB: ['', Validators.required],
                    fromDate: ['2019-06-10', Validators.required],
                    toDate: ['2019-06-15', Validators.required]
                    });
                }

  ngOnInit() {
    this.getExchanges();
  }

  selectExchangeClick(ob) {
    const selectedExchange = ob.value;
    this.companyservice.findExchangeCompany(selectedExchange).subscribe(data => {
       // tslint:disable-next-line:no-string-literal
       if (data['code'] === 200) {
        // tslint:disable-next-line:no-string-literal
        this.excompanies = data['data'];
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


  getExchanges() {

    this.companyservice.findExchange().subscribe(data => {

      // tslint:disable-next-line:no-string-literal
      if (data['code'] === 200) {
        // tslint:disable-next-line:no-string-literal
        this.exchanges = data['data'];
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

  generateMap() {

    if (this.form.valid) {
      this.showExCompany = true;
      const comapnycodeA = this.form.value.comapnycodeA;
      const companycodeB = this.form.value.comapnycodeB;
      const fromDate = this.datePipe.transform(this.form.value.fromDate, 'yyyy-MM-dd');
      const toDate = this.datePipe.transform(this.form.value.toDate, 'yyyy-MM-dd');
      this.submitted = true;
      this.loading = true;
      this.stockService.compareExchangeCompany(comapnycodeA, companycodeB, fromDate, toDate)
      .pipe(first())
        .subscribe(
            data => {
              // tslint:disable-next-line:no-string-literal
              if (data['code'] === 200) {
                // tslint:disable-next-line:no-string-literal
                this.alertService.success(data['message']);
                // data['data'].map(name => {
                //   console.log(name.companycode);
                // });
                // tslint:disable-next-line:no-string-literal
                this.seriesData = data['data'];
                this.loading = false;
                this.showExCompany = false;
              }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                this.showExCompany = false;
            });
    }

  }
}
