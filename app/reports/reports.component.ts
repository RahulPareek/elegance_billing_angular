import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { BillReport } from '../models/billReport';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {

  private httpSubscription;
  public reports: BillReport[];
  public startDate: Date;
  public endDate: Date;
  public error;
  public customRange = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
  }

  getReport(dateFor: string) {
    const today = new Date(Date.now());
    if (dateFor === 'today') {
      this.customRange = false;
      this.getReportsfromHttpService(today, today);

    } else if (dateFor === 'week') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      this.getReportsfromHttpService(lastWeek, today);
      this.customRange = false;

    } else if (dateFor === 'month') {
      const lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() - 30);
      this.getReportsfromHttpService(lastMonth, today);
      this.customRange = false;

    } else if (dateFor === 'custom') {
      this.customRange = true;
      const sDate = new Date(this.startDate);
      const eDate = new Date(this.endDate);
      this.getReportsfromHttpService(sDate, eDate);
    }
  }

  getReportsfromHttpService(startDate: Date, endDate: Date) {
    this.httpSubscription = this.httpService.getReports(startDate, endDate).
                            subscribe(
                              (data: BillReport[]) => {console.log('Report received', data);
                                                      this.reports = data; },
                              error => this.error = error
                            );
  }

  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }

}
