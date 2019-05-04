export class Client {

    public id: number;
    public name: string;
    public address: string;
    public mobile_no: string;
    public email_id: string;


    constructor(cname: string, caddress: string, cmobile_no: string, cemail_id: string) {
        this.name = cname;
        this.address = caddress;
        this.mobile_no = cmobile_no;
        this.email_id = cemail_id;
    }

}