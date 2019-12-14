import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { Sector } from '../models/Sector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateCompanyComponent } from '../update-company/update-company.component';
import { CompanyService } from '../service/company.service';
import { AlertService } from '../service/alert.service';
import { AddCompanyComponent } from '../add-company/add-company.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showCompany: boolean;

  companys: Company[];

  sectors: Sector[];

  constructor(private companyservice: CompanyService,
              private alertService: AlertService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getSector();
  }

  getCompany() {
    this.showCompany = true;

    this.companyservice.findCompanys().subscribe(data => {

        // tslint:disable-next-line:no-string-literal
        if (data['code'] === 200) {
        // tslint:disable-next-line:no-string-literal
        this.companys = data['data'];
        this.showCompany = false;
      // tslint:disable-next-line:no-string-literal
      } else if (data['code'] === 404) {
        // tslint:disable-next-line:no-string-literal
        this.showCompany = false;
        // tslint:disable-next-line:no-string-literal
        this.alertService.warn(data['message']);
      }

    },
    error => {
      this.alertService.error(error);
      this.showCompany = false;
          });
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

    selectAdminClick(tab) {

      if (tab.index === 1 ) {
        this.getCompany();
      }
    }

    addCompanyDialog() {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '500px';
      dialogConfig.data = {
        sectordata: this.sectors
      };
      this.dialog.open(AddCompanyComponent,
        dialogConfig);

  }

  updateCompanyDialog(updatecompany: Company) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      update_company: updatecompany,
      sectordata: this.sectors

  };

    this.dialog.open(UpdateCompanyComponent,
      dialogConfig);

}
onFileComplete(data: any) {
  console.log(data); // We just print out data bubbled up from event emitter.
}

}
