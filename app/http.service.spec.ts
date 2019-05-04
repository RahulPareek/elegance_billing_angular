import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HttpService } from './http.service';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { BillCreateComponent } from './bill-create/bill-create.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { LoginComponent } from './login/login.component';
import { ManageBillsComponent} from './manage-bills/manage-bills.component';
import { ReportsComponent } from './reports/reports.component';

describe('HttpService Test', () => {

    let httpService: HttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent,
                    BillCreateComponent,
                ClientCreateComponent,
                ClientEditComponent,
                ClientListComponent,
                LoginComponent,
                ManageBillsComponent,
                ReportsComponent],
            providers: [HttpService]
        });
        httpService = TestBed.get(HttpService);
    });

    it('httpService should be created', () => {
        expect(httpService).toBeTruthy();
    });

    it('should return client', () => {
        const client = {name: 'Dummy name', address: 'Dummy Address',
        mobile_no: '123456789', email_id: 'dummy@gmail.com'};
        let response;

        spyOn(httpService, 'getClientForId').and.returnValue(of(client));

        httpService.getClientForId(1).subscribe(
            data => response = data
        );

        expect(response).toEqual(client);

    });

});

