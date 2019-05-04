import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { catchError, ignoreElements } from 'rxjs/operators';

import { Client } from './models/client';
import { BillDescription } from './models/billDescription';
import { Bill } from './models/bill';
import { PaymentDetails } from './models/paymentDetails';
import { User } from './models/user';
import { BillReport } from './models/billReport';

@Injectable({providedIn: 'root'})
export class HttpService {

    private BASE_URL = 'https://elegancewellnessbilling.in/api/';

    private getTokenURL = this.BASE_URL + 'get-auth-token/';

    private clientSearchURL = this.BASE_URL + 'client/search/';
    private clientURL = this.BASE_URL + 'client/';
    private clientCreateURL = this.BASE_URL + 'client/create/';
    private billCreateURL = this.BASE_URL + 'bill/create/';
    private getReportURL = this.BASE_URL + 'bill/report/';
    private getUpdateBillURL = this.BASE_URL + 'bill/';

    public isLoggedIn: Boolean;


    constructor(private http: HttpClient) {
        if (this.getSavedToken()) {
            this.isLoggedIn = true;
            console.log('Http Service. TOken Value exists');
        }
    }

    getHTTPOptions() {
       const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.getSavedToken(),
            })
        };
        return httpOptions;
    }

    getTokenValue(user: User) {
     return this.http.post<any>(this.getTokenURL, {'username': user.username,
                                                    'password': user.password})
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    searchClients(clientName: string) {
        console.log('Search query in service is ', clientName);

        const searchTerm = clientName.trim();

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.getSavedToken(),
            }),
            params: new HttpParams().set('clientName', searchTerm)
        };

        return this.http.get<Client[]>(this.clientSearchURL, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }



    getReports(startDate: Date, endDate: Date) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.getSavedToken(),
            }),
            params: new HttpParams().set('startdate', JSON.parse(JSON.stringify(startDate)))
                                    .set('enddate', JSON.parse(JSON.stringify(endDate)))
        };

        return this.http.get<BillReport[]>(this.getReportURL, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    getClientForId(id: number) {

        const url = `${this.clientURL}${id}`;

        console.log('Making http request getClientForId at', url);

        return this.http.get<Client>(url, this.getHTTPOptions())
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    createClient(client: Client) {

        console.log('Making http post request to create client');
        console.log('Request header', this.getHTTPOptions().headers.get('Authorization'));

        return this.http.post<Client>(this.clientCreateURL, client, this.getHTTPOptions())
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    updateClient(client: Client) {

        const url = `${this.clientURL}${client.id}/`;

        console.log('Making http request getClientForId at', url);

        return this.http.put<Client>(url, client, this.getHTTPOptions())
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    createBill(bill: Bill, client: Client, paymentDetails: PaymentDetails,
        billDescription: BillDescription[], companyName: string, discount: string) {
        console.log('Making request to create a Bill');

        const billDetails = {'bill': bill, 'client': client, 'paymentDetails': paymentDetails,
                            'billDescription': billDescription, 'companyName': companyName,
                            'discount': discount};

        return this.http.post<Bill>(this.billCreateURL, billDetails, this.getHTTPOptions())
                        .pipe(
                            catchError(this.handleError)
                        );
    }


    getBill(id: number) {
        const url = `${this.getUpdateBillURL}${id}`;

        return this.http.get<any>(url, this.getHTTPOptions())
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    updateBill(bill: Bill, client: Client) {
        const url = `${this.getUpdateBillURL}${bill.id}/`;

        const data = {'bill': bill, 'client': client};

        return this.http.put<any>(url, data, this.getHTTPOptions())
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    private handleError(error: HttpErrorResponse) {
        console.log('error', error);
        return throwError(error.message);
    }

    saveToken(token: string) {
        console.log('Saving Token Value');
        localStorage.setItem('token', token);
        this.setIsLoggedInToTrue();
    }

    removeToken() {
        localStorage.removeItem('token');
        this.setLoggedInToFalse();
        console.log('App component Logging out');
    }

    getSavedToken(): string {
        return localStorage.getItem('token');
    }

    setLoggedInToFalse() {
        this.isLoggedIn = false;
    }

    setIsLoggedInToTrue() {
        this.isLoggedIn = true;
    }
}