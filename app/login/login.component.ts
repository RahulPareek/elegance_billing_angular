import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User;
  public error: string;
  private getTokenSubscription;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  onFormSubmit() {
    this.getTokenSubscription = this.httpService.getTokenValue(this.user).subscribe(
                                                data => { this.error = null;
                                                  this.saveToken(data.token); },
                                                error => this.error = 'Unable to login with provided credentials'
    );
  }

  saveToken(token: string) {
    this.httpService.saveToken(token);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.getTokenSubscription.unsubscribe();
  }

}
