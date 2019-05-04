import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../models/client';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit, OnDestroy {

  public client: Client;
  private createClientSubscription;

  public success;
  public error;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.client = new Client('', '', '', '');
  }


  onFormSubmit() {
    console.log('Client form submission');
    this.checkIfLoggedIn();
    this.createClientSubscription = this.httpService.createClient(this.client)
                                        .subscribe(
                                          (data: Client) => { this.error = null;
                                              this.success = 'Client created successfully'; },
                                          error => {this.error = error;
                                                    this.success = null; }
                                        );
  }

  checkIfLoggedIn() {
    if (!this.httpService.getSavedToken()) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.createClientSubscription.unsubscribe();
  }

}
