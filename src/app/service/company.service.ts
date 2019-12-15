import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewCompany } from '../models/newCompany';
import { environment } from '../../environments/environment';
import { UpdateCompany } from '../models/UpdateCompany';
import { Exchange } from '../models/Exchange';
import { NewExchange } from '../models/NewExchange';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  addCompany(company: NewCompany) {
    return this.http.post(`${environment.gatewayurl}/company/api/v1/company/add`, company);
  }

  updateCompany(company: UpdateCompany) {
    return this.http.put(`${environment.gatewayurl}/company/api/v1/company/update/${company.id}`, company);
  }

  findCompanys() {
    return this.http.get(`${environment.gatewayurl}/company/api/v1/company/list`);
  }

  findSectors() {
    return this.http.get(`${environment.gatewayurl}/company/api/v1/sector/list`);
  }

  findExchange() {
    return this.http.get(`${environment.gatewayurl}/company/api/v1/exchange/list`);
  }

  addExchange(exchange: NewExchange) {
    return this.http.post(`${environment.gatewayurl}/company/api/v1/exchange/add`, exchange);
  }

  updateExchange(exchange: Exchange) {
    return this.http.put(`${environment.gatewayurl}/company/api/v1/exchange/update/${exchange.id}`, exchange);
  }

}
