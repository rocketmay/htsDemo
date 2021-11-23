import { TransactionReceipt, TransactionResponse } from '@hashgraph/sdk';
import { TokenInfo } from './../classes/token-info';
import { StorageService } from './storage.service';
import { AccountInfo } from './../classes/account-info';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoServiceService {

  adminAccount: AccountInfo;
  treasuryAccount: AccountInfo;

  userA: AccountInfo;
  userB: AccountInfo;

  tokenInfo: TokenInfo;
  receipt:TransactionReceipt;
  response:TransactionResponse;

  consoleCreateTransaction:string[];
  consoleSignAndSubmit:string[];
  consoleReceipt:string[];
  
  txnCreateLink:string;

  constructor() { 

    this.adminAccount =  new AccountInfo("Admin","0.0.2205415","302e020100300506032b657004220420509e927ab9dbc4c2280c68d5b6c84a9d6044036722fd6d2db37f32ccbf95799b");
    this.treasuryAccount = new AccountInfo("Treasury","0.0.2205416","302e020100300506032b657004220420c73710abb83feb33c0e8ed386b35c316ade4b695f1d5f18fdfd8d41cf251a4d8");

    this.userA = new AccountInfo("Alice","0.0.2205417","302e020100300506032b65700422042099695647f879e313279648cec8eac9d0a79767ef0e946644663f19e9414ffd82");
    this.userB = new AccountInfo("Bob","0.0.2205418","302e020100300506032b65700422042038aa14df914c9f28a1ac02bdc9b0a5bbe37c0562083ab5af85ea6c6bdc152f3d");

    this.tokenInfo = new TokenInfo();
    this.SetDefaultTreasury();

    console.log("demo service initiated");
    this.consoleCreateTransaction = [];
    this.consoleSignAndSubmit = [];
    this.consoleReceipt = [];

    //this.tokenInfo.name = "WATER";
    //this.tokenInfo.symbol = "WATA";
    //this.tokenInfo.tokenId = "0.0.2212836";
  }

  public SetDefaultTreasury()
  {
    this.treasuryAccount = new AccountInfo("Treasury","0.0.2205416","302e020100300506032b657004220420c73710abb83feb33c0e8ed386b35c316ade4b695f1d5f18fdfd8d41cf251a4d8");
    this.tokenInfo.treasuryAccountId = this.treasuryAccount.accountId;
    this.tokenInfo.treasuryKey = this.treasuryAccount.privateKey;
  }

  public SetAdmin()
  {
    this.adminAccount =  new AccountInfo("Admin","0.0.2205415","302e020100300506032b657004220420509e927ab9dbc4c2280c68d5b6c84a9d6044036722fd6d2db37f32ccbf95799b");

  }

}
