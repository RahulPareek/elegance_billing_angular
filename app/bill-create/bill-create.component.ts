import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../http.service';
import { Client } from '../models/client';
import { Bill } from '../models/bill';
import { BillDescription } from '../models/billDescription';
import { PaymentDetails } from '../models/paymentDetails';
import { allServices } from '../elegance_service';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css'],
})
export class BillCreateComponent implements OnInit, OnDestroy {

  public billDescriptions: BillDescription[];
  public client: Client;
  public bill: Bill;
  public paymentDetails;
  private httpSubscription;
  private createBillSubscription;
  public discountPercent;
  public companyName: string;

  private serviceCategorySelected = new Array();
  private subServiceSelected = new Array();
  private servicesCategories = allServices;

  public error;
  public success;

  public submitButton: Boolean = true;

  constructor(private httpService: HttpService, private route: ActivatedRoute,
            private router: Router) {}

  ngOnInit() {
    this.getClientForId(this.route.snapshot.params['id']);

    this.billDescriptions = new Array();
    this.billDescriptions.push(new BillDescription(' ', 0, 0));
    this.serviceCategorySelected.push('');
    this.subServiceSelected.push('');

    this.bill = new Bill();
    this.bill.received_amount = 0;
    this.paymentDetails = new PaymentDetails();

    this.submitButton = true;
  }

  onCategorySelected(category, i) {
    this.serviceCategorySelected[i] = category;
  }

  onServiceChanged(service, i) {
    this.subServiceSelected[i] = service;
    this.billDescriptions[i].description = this.serviceCategorySelected[i].service_name + ' ' + service.sub_service;
    this.billDescriptions[i].package_amount = service.price;
    this.onAmountChange();
  }


  getClientForId(id: number) {
    this.checkIfLoggedIn();
    this.httpSubscription = this.httpService.getClientForId(id)
    .subscribe(
      (data: Client) => { this.client = data; },
        error => this.error = error
      );
  }


  addBillDescription() {
    console.log('Bill descriptions value ', this.billDescriptions);
    this.billDescriptions.push(new BillDescription('', 0, 0));
    this.serviceCategorySelected.push('');
    this.subServiceSelected.push('');
  }


  removeBillDescription(i: number) {
    console.log('Bill description removed ', i);
    this.billDescriptions.splice(i, 1);
    console.log('Service main catrgory', this.serviceCategorySelected);
    console.log('Sub service selected');
    console.log('Bill descriptions value ', this.billDescriptions);
    this.serviceCategorySelected.splice(i, 1);
    this.subServiceSelected.splice(i, 1);
    this.onAmountChange();
    this.calculateBalance();
  }


  onAmountChange() {
    this.bill.total_amount = 0;
    for (const billDescription of this.billDescriptions) {
      this.bill.total_amount += +billDescription.package_amount * billDescription.no_of_sessions;
    }
  }

  calculateDiscountedAmount() {
    this.onAmountChange();
    if (this.discountPercent === '10') {
      this.bill.total_amount -= 0.1 * this.bill.total_amount;
    } else if (this.discountPercent === '20') {
      this.bill.total_amount -= 0.2 * this.bill.total_amount;
    } else {
      this.onAmountChange();
    }
    this.calculateBalance();
  }


  calculateBalance() {
    if (this.bill.total_amount > 0) {
      this.bill.balance = this.bill.total_amount - this.bill.received_amount;
    }
  }


  trackByFn(id: number, item: any) {
    return id;
  }

  trackCategories(id: number, item: any) {
    return id;
  }

  trackServices(id: number, item: any) {
    return id;
  }


  onFormSubmit() {
    this.checkIfLoggedIn();

    this.submitButton = false;

    this.createBillSubscription = this.httpService.createBill(this.bill, this.client,
      this.paymentDetails, this.billDescriptions, this.companyName, this.discountPercent)
                    .subscribe(
                      (data: Bill) => {this.success = 'Bill created successfully';
                                      this.error = null;
                                    this.submitButton = true; },
                      error => {this.error = error;
                                this.success = null;
                                this.submitButton = true; }

    );
  }

  checkIfLoggedIn() {
    if (!this.httpService.getSavedToken()) {
      this.router.navigate(['/']);
    }
  }


  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
    this.createBillSubscription.unsubscribe();
  }

}
