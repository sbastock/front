import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService} from '../service/company.service';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
import { Company } from '../models/Company';
import { Sector } from '../models/Sector';
import { Exchange } from '../models/Exchange';

@Component({
  selector: 'app-update-exchange',
  templateUrl: './update-exchange.component.html',
  styleUrls: ['./update-exchange.component.css']
})
export class UpdateExchangeComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  updateexchange: Exchange;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateExchangeComponent>,
    @Inject(MAT_DIALOG_DATA) {update_exchange},
    private alertService: AlertService,
    private companyService: CompanyService
  ) {
    this.updateexchange = update_exchange;
    this.form = fb.group({
      id: [this.updateexchange.id],
      name: [this.updateexchange.name, Validators.required],
      brief: [this.updateexchange.brief, Validators.required],
      address: [this.updateexchange.address, Validators.required],
      remarks: [this.updateexchange.remarks]
      });
  }

  ngOnInit() {
  }

  update() {
    if (this.form.valid) {
      const exchangeupdate: Exchange = {
        id: this.form.value.id,
        name : this.form.value.name,
        brief : this.form.value.brief,
        address: this.form.value.address,
        remarks: this.form.value.remarks
      };
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      this.loading = true;
      this.companyService.updateExchange(exchangeupdate)
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
      this.dialogRef.close(exchangeupdate);
    }
}
close() {
  this.dialogRef.close();
}

}
