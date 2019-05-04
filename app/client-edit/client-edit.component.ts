import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../http.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit, OnDestroy {

  public client: Client;
  private httpSubscription;
  private paramSubscription;
  private clientUpdateSubscription;

  public success;
  public error;

  constructor(private httpService: HttpService, private route: ActivatedRoute,
                          private router: Router) { }

  ngOnInit() {
    console.log('Id parameter received is ', this.route.snapshot.params['id']);

     // this.paramSubscription = this.route.snapshot.params.subscribe(
       //                             params => this.getClientForId(params['id']));

     this.getClientForId(this.route.snapshot.params['id']);
  }


  getClientForId(id: number) {
    this.checkIfLoggedIn();
    this.httpSubscription = this.httpService.getClientForId(id)
                                .subscribe(
                                  (data: Client) => {
                                      this.client = data;
                                  },

                                  error => { this.success = null;
                                        this.error = error; }
                                );
  }


  onFormSubmit() {
    this.checkIfLoggedIn();
    this.clientUpdateSubscription = this.httpService.updateClient(this.client)
                    .subscribe(
                            (data) => {this.error = null;
                              this.success = 'Client details edited successfully'; },
                              error => this.error = error
                    );
  }

  checkIfLoggedIn() {
    if (!this.httpService.getSavedToken()) {
      this.router.navigate(['/']);
    }
  }


  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }
}
