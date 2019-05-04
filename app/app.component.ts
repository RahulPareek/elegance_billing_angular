import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from './http.service';
import { Client } from './models/client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'elegance-billing';
  searchClient: string;
  private clients: Client[];
  private error: string;
  private year;

  constructor(public httpService: HttpService, public router: Router) {}

  ngOnInit(): void {

    if (!this.httpService.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {

    this.searchClient = '';
    this.clients = new Array();
    }

    this.year = (new Date()).getFullYear();
  }

  logout() {
    this.httpService.removeToken();
    console.log('App component Logging out');
  }
}
