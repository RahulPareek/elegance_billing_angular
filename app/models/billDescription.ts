import { Bill } from './bill';

export class BillDescription {
    public description: string;
    public no_of_sessions: number;
    public package_amount: number;
    public bill: Bill;

    constructor(cdescription: string, cno_of_sessions: number, cpackage_amount: number) {
        this.description = cdescription;
        this.no_of_sessions = cno_of_sessions;
        this.package_amount = cpackage_amount;
    }
}