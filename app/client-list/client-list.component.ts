import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../http.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
  searchClient: string;
  public clients: Client[];
  public error: string;
  private queryParamSubscription;
  private httpSubscription;

  constructor(private httpService: HttpService, private route: ActivatedRoute,
              private router: Router) {
   }


  ngOnInit(): void {
    this.searchClient = this.route.snapshot.queryParamMap.get('clientName');
    this.clients = new Array();

    this.queryParamSubscription = this.route.queryParamMap.subscribe(
                    queryParamMap => {this.searchClient = queryParamMap.get('clientName');
                                    this.getClients(); });
  }


  getClients() {
    this.checkIfLoggedIn();
    this.httpSubscription = this.httpService.searchClients(this.searchClient)
                    .subscribe(
                            (data: Client[]) => {if (data.length === 0) {
                              this.error = 'No results found';
                            } else {
                              this.error = null;
                            }
                            this.clients.splice(0, this.clients.length);
                            this.clients = this.clients.concat(data); },

                             error => this.error
    );
  }

  checkIfLoggedIn() {
    if (!this.httpService.getSavedToken()) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();
  }

}
