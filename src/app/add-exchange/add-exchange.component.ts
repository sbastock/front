import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../service/company.service';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
import { NewExchange } from '../models/NewExchange';

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  styleUrls: ['./add-exchange.component.css']
})
export class AddExchangeComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddExchangeComponent>,
    private alertService: AlertService,
    private companyService: CompanyService
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      brief: ['', Validators.required],
      address: ['', Validators.required],
      remarks: ['']
      });
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      const exchange: NewExchange = {

        name : this.form.value.name,
        brief : this.form.value.brief,
        address: this.form.value.address,
        remarks: this.form.value.remarks
      };
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      this.loading = true;
      this.companyService.addExchange(exchange)
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
      this.dialogRef.close(exchange);
    }
}

close() {
    this.dialogRef.close();
}

}
