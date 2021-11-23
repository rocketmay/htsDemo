
export class TokenInfo {

    name: string;
    symbol: string;
    decimal: number;
    initialSupply: number;
    treasuryAccountId: string;
    treasuryKey: string;
    adminKey: string;
    KYCKey: string;
    freezeKey: string;
    wipeKey: string;
    supplyKey: string;
    //feeScheduleKey: string;
    //customFees: CustomFee[]; 
    freezeDefault: boolean;
    expirationTime: number;
    autoRenewAccount: string;
    autoRenewPeriod: number; // in minutes . Default is 131,500 minutes in HTS.
    memo: string; // public. 100 character limit . can point to a URI.
    tokenId: string;

}
