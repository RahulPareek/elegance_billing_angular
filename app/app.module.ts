import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router' ;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { BillCreateComponent } from './bill-create/bill-create.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { ManageBillsComponent } from './manage-bills/manage-bills.component';


const appRoutes: Routes = [
  {path: 'client/search', component: ClientListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'client/create', component: ClientCreateComponent},
  {path: 'client/edit/:id', component: ClientEditComponent},
  {path: 'bill/create/client/:id', component: BillCreateComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'bill/edit', component: ManageBillsComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientCreateComponent,
    BillCreateComponent,
    ClientEditComponent,
    LoginComponent,
    ReportsComponent,
    ManageBillsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
