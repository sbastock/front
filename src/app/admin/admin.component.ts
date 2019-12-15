import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { Sector } from '../models/Sector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateCompanyComponent } from '../update-company/update-company.component';
import { CompanyService } from '../service/company.service';
import { AlertService } from '../service/alert.service';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { UploadRsp } from '../models/UploadRsp';
import { Exchange } from '../models/Exchange';
import { AddExchangeComponent } from '../add-exchange/add-exchange.component';
import { UpdateExchangeComponent } from '../update-exchange/update-exchange.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showCompany: boolean;
  showExchange: boolean;
  companys: Company[];
  exchanges: Exchange[];
  sectors: Sector[];
  showUploadResult = false;
  uploadRsp: UploadRsp;

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

      getExchange() {
        this.showExchange = true;
        this.companyservice.findExchange().subscribe(data => {
            // tslint:disable-next-line:no-string-literal
            if (data['code'] === 200) {
            // tslint:disable-next-line:no-string-literal
            this.exchanges = data['data'];
            this.showExchange = false;
          // tslint:disable-next-line:no-string-literal
          } else if (data['code'] === 404) {
            // tslint:disable-next-line:no-string-literal
            this.showExchange = false;
            // tslint:disable-next-line:no-string-literal
            this.alertService.warn(data['message']);
          }
        },
        error => {
          this.alertService.error(error);
          this.showExchange = false;
              });
        }


    selectAdminClick(tab) {

      if (tab.index === 1 ) {
        this.getCompany();
      } else if (tab.index === 2 ) {
        this.getExchange();
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

  addExchangeDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(AddExchangeComponent,
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

updateExchangeDialog(updatexchange: Exchange) {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';
  dialogConfig.data = {
    update_exchange: updatexchange

};

  this.dialog.open(UpdateExchangeComponent,
    dialogConfig);

}
onFileComplete(data: any) {
  // We just print out data bubbled up from event emitter.
  if (data.code === 200) {
    this.uploadRsp = {
      companyname: data.data.companyName,
      fileDownloadUri: data.data.fileDownloadUri,
      fileName: data.data.fileName,
      fileType: data.data.fileType,
      fromDate: data.data.fromDate,
      records: data.data.records,
      size: data.data.size,
      stockExchange: data.data.stockExchange,
      toDate: data.data.toDate
    };

    this.showUploadResult = true;
  }
}

}
