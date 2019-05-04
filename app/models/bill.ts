import { PaymentDetails } from './paymentDetails';
import { Client } from './client';
import { BillDescription } from './billDescription';

export class Bill {
    public id;
    public total_amount:  number;
    public received_amount:  number;
    public balance:  number;
    public rs_in_words: string;
    public payment_details: PaymentDetails;
    public client: Client;
    public bill_description: BillDescription[];
}