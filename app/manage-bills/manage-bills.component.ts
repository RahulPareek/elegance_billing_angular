import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillDescription } from '../models/billDescription';
import { Client } from '../models/client';
import { Bill } from '../models/bill';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrls: ['./manage-bills.component.css']
})
export class ManageBillsComponent implements OnInit, OnDestroy {

  public billId: number;
  private client: Client;
  private bill: Bill;
  private getBillSubscription;
  private error;
  private editBillSubscription;
  private recevdAmount: number;
  private bal: number;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }


  getBillDetails() {
    this.checkIfLoggedIn();
    this.getBillSubscription = this.httpService.getBill(this.billId).
                                    subscribe(
                                      (data: any) => {this.bill = data.bill;
                                                      this.client = data.client;
                                                      this.recevdAmount = Math.round(this.bill.received_amount);
                                                    this.bal = Math.round(this.bill.balance); },
                                      error => this.error = error
                                    );
  }


  onFormSubmit() {
    this.bill.received_amount = this.recevdAmount;
    this.bill.balance = this.bal;

    this.editBillSubscription = this.httpService.updateBill(this.bill, this.client).
                                              subscribe(
                                                (data => this.bill = data.bill),
                                                error => this.error = error
                                              );

  }

  calculateReceivedAmount() {
    this.recevdAmount = Math.round(this.bill.received_amount);
    const prevBal = Math.round(this.bill.total_amount) - Math.round(this.bill.received_amount);
    const balDiff = prevBal - +this.bal;
    this.recevdAmount = this.recevdAmount + balDiff;
    console.log('Received : balance: prev Bal', this.recevdAmount, this.bal, prevBal);
  }


  checkIfLoggedIn() {
    if (!this.httpService.getSavedToken()) {
      this.router.navigate(['/']);
    }
  }


  ngOnDestroy() {
    this.getBillSubscription.unsubscribe();
    this.editBillSubscription.unsubscribe();
  }

}
