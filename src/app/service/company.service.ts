import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewCompany } from '../models/newCompany';
import { Company } from '../models/Company';
import { environment } from '../../environments/environment';
import { UpdateCompany } from '../models/UpdateCompany';

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

}
