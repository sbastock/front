import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DatePipe} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyChartsComponent } from './user/company-compare/company-charts/company-charts.component';
import { CompanyCompareComponent } from './user/company-compare/company-compare.component';
import { UserIposComponent } from './user/user-ipos/user-ipos.component';
import { MatTableModule } from '@angular/material';
import { SectorCompareComponent } from './user/sector-compare/sector-compare.component';
import { SectorChartsComponent } from './user/sector-compare/sector-charts/sector-charts.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddExchangeComponent } from './add-exchange/add-exchange.component';
import { UpdateExchangeComponent } from './update-exchange/update-exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    AlertComponent,
    NotFoundComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    UpdateCompanyComponent,
    AddCompanyComponent,
    CompanyChartsComponent,
    CompanyCompareComponent,
    UserIposComponent,
    SectorCompareComponent,
    SectorChartsComponent,
    FileUploadComponent,
    AddExchangeComponent,
    UpdateExchangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    Ng2SearchPipeModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatTooltipModule,
    NgxEchartsModule,
  ],
  providers: [MatDatepickerModule, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [AddCompanyComponent, UpdateCompanyComponent, AddExchangeComponent, UpdateExchangeComponent]
})
export class AppModule { }
