import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  compareExchangeCompany(companycodeA: string, companycodeB: string, fromDate: string, toDate: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.gatewayurl}/stock/api/v1/stock/list?companycode1=${companycodeA}&companycode2=${companycodeB}&fromDate=${fromDate}&toDate=${toDate}`);
  }
}
