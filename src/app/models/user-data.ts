export class UserData {
    token: string | null | undefined;
    fullname: string | null | undefined;

    constructor(){
        this.token = null;
        this.fullname = null;
    }
}

export class AuthData {
    accountId: string | null;
    fullName: string | null;
    accessToken: string | null;
    expiredDate: Date | null;

    constructor(){
        this.accountId = null;
        this.fullName = null;
        this.accessToken = null;
        this.expiredDate = new Date();
    }
}