export class AccountInfo {

    name: string;
    accountId: string;
    privateKey: string;
    
    constructor(pName: string, pAccountId: string, pPrivateKey: string) {

        this.name = pName;
        this.accountId = pAccountId;
        this.privateKey = pPrivateKey;

     }

}
