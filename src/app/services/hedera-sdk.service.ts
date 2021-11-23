import { DemoServiceService } from './demo-service.service';
import { TokenInfo } from './../classes/token-info';
import { Injectable } from '@angular/core';
import { TokenCreateTransaction, TokenRelationshipMap, AccountInfo, AccountInfoQuery, TransactionReceipt, AccountBalanceQuery,HbarUnit, AccountId, TransactionResponse, Client, Hbar, Mnemonic, PrivateKey, TokenAssociateTransaction, TokenId, TokenInfoQuery, Transaction, TransferTransaction, TokenRelationship } from '@hashgraph/sdk';
import NodeClient from '@hashgraph/sdk/lib/client/NodeClient';
import BigNumber from 'bignumber.js';

@Injectable({
  providedIn: 'root'
})
export class HederaSDKService {

  private client: NodeClient;

  constructor(private demoService:DemoServiceService) { 
    
  }

  public GetClient():NodeClient{
    return this.client;
  }

  initClient()
  {
    if(!this.client)
    {
    const operatorKey =  PrivateKey.fromString(this.demoService.adminAccount.privateKey);
    const operatorId = AccountId.fromString(this.demoService.adminAccount.accountId);

    this.client = Client.forTestnet();
    this.client.setOperator(operatorId, operatorKey);
    }
	}

  /**
   * Creates an account on the Hedera network
   * 
   * THIS WILL CHARGE THE OPERATOR ACCOUNT FOR THE CREATION
   * 
   * @param private_key private key to associate with a new hedera account
   * @returns the account ID string
   */
  async createAccount(): Promise<string> {
    let mnemonic =  await Mnemonic.generate();
    const newAccountRootKey = await mnemonic.toPrivateKey();
	  const newAccountPrivateKey = await newAccountRootKey.derive(0);

    return Promise.resolve(newAccountPrivateKey.toString());
  }

  public GeneratePrivateKey(): string {
    const key = PrivateKey.generate();
    return key + "";
  }

  async associateTokenToAccount(tokenId: string, accountId: string, accountPrivateKey: string): Promise<string> {

    //Associate a token to an account and freeze the unsigned transaction for signing
    const transaction = await new TokenAssociateTransaction()
        .setAccountId(AccountId.fromString(accountId))
        .setTokenIds([tokenId])
        .freezeWith(this.client);

    //console.log("transaction: ", transaction);

    //Sign with the private key of the account that is being associated to a token 
    const signTx = await transaction.sign(PrivateKey.fromString(accountPrivateKey));

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(this.client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(this.client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " + transactionStatus.toString());
    
    return receipt.status.toString();

  }

  async GetInfoQuery(accountId:string):Promise<AccountInfo>
  {
    
    // Sanity checks
    if (!accountId) {
      return Promise.reject('Must specify a valid account ID');
    }
    const query = new AccountInfoQuery()
    .setAccountId(AccountId.fromString(accountId));

    //Sign with client operator private key and submit the query to a Hedera network
    const accountInfo = await query.execute(this.client);

    return accountInfo;
  }

  async AssociateTokenToAccount(accountId: string, accountPrivateKey:string, tokenId: string ):Promise<TransactionReceipt>
  {
    //Associate a token to an account and freeze the unsigned transaction for signing
    const transaction = await new TokenAssociateTransaction()
    .setAccountId(AccountId.fromString(accountId))
    .setTokenIds([tokenId])
    .freezeWith(this.client);

    //Sign with the private key of the account that is being associated to a token 
    const signTx = await transaction.sign(PrivateKey.fromString(accountPrivateKey));

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(this.client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(this.client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " +transactionStatus.toString());
    return receipt;

  }

  async GetTokenAssociations(accountId: string):Promise<TokenRelationshipMap>
  {

    // Sanity checks
    if (!accountId) {
      return Promise.reject('Must specify a valid account ID');
    }

    const accountInfo = await this.GetInfoQuery(accountId);

    //console.log(accountInfo.tokenRelationships);
    return accountInfo.tokenRelationships;

  }

  async GetTokenBalance(accountId: string, tokenId: string)
  {
    //Create the query
    const query = new AccountBalanceQuery()
    .setAccountId(accountId);

    //Sign with the client operator private key and submit to a Hedera network
    const tokenBalance = await query.execute(this.client);
    //console.log("balance");
    //console.log(tokenBalance.tokens.get(tokenId));
    return tokenBalance.tokens.get(tokenId);
  }

  async sendToken(tokenId:string, targetAccountId:string,senderAccount:string, senderKey:string, value:number):Promise<TransactionReceipt>
  {
      //Create the transfer transaction
      const transaction = await new TransferTransaction()
          .addTokenTransfer(TokenId.fromString(tokenId), AccountId.fromString(senderAccount), -value)
          .addTokenTransfer(TokenId.fromString(tokenId), AccountId.fromString(targetAccountId), value)
          .freezeWith(this.client);

      //Sign with the sender account private key
      const signTx = await transaction.sign(PrivateKey.fromString(senderKey));

      //Sign with the client operator private key and submit to a Hedera network
      const txResponse = await signTx.execute(this.client);

      //Request the receipt of the transaction
      const receipt = await txResponse.getReceipt(this.client);

      //Obtain the transaction consensus status
      const transactionStatus = receipt.status;
      
      //console.log("The transaction consensus status " +transactionStatus.toString());
      return receipt;

  }

  async GetHBARBalance(accountId: string):Promise<BigNumber>
  {
    // Sanity checks
    if (!accountId) {
      return Promise.reject('Must specify a valid account ID');
    }

    // Convert the string to an object the SDK can use
    const account_id = AccountId.fromString(accountId);

    const query = new AccountBalanceQuery()
      .setAccountId(account_id);

    const account_balance = await query.execute(this.client);

    const big_val = account_balance.hbars.to(HbarUnit.Hbar);

    return big_val;
    
  }

  async CreateToken(transaction:TokenCreateTransaction, tokeninfo:TokenInfo):Promise<TransactionResponse>
  {
    

    let signTx;
    
    if(tokeninfo.adminKey != null)
    {
      signTx = await transaction.sign(PrivateKey.fromString(tokeninfo.adminKey));
    }

    if(tokeninfo.treasuryKey)
    {
      signTx = await transaction.sign(PrivateKey.fromString(tokeninfo.treasuryKey));
    }
    //Submit the transaction to a Hedera network    
    const txResponse = await transaction.execute(this.client);
    return txResponse;

  }

}
