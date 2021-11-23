import { HederaSDKService } from './hedera-sdk.service';
import { TokenInfo } from './../classes/token-info';
import { Injectable } from '@angular/core';
import { TokenCreateTransaction, PrivateKey } from '@hashgraph/sdk';

@Injectable({
  providedIn: 'root'
})
export class TokenCreateServiceService {

  transaction: TokenCreateTransaction;

  tokenInfo: TokenInfo;

  codeName: string;
  codeSymbol: string;
  codeDecimals: string;
  codeInitialSupply: string;
  codeTreasuryAccountId: string;
  codeAdminKey: string;
  codeKYCKey: string;
  codeFreezeKey: string;
  codeWipeKey: string;
  codeSupplyKey: string;
  codeFeeScheduleKey: string;
  codeCustomFees: string; 
  codeFreezeDefault: string;
  codeExpirationTime: string;
  codeAutoRenewAccount: string;
  codeAutoRenewPeriod: string;
  codeMemo: string;

  constructor(private hederaSDKService:HederaSDKService) {

      this.ResetToken();

   }

  public SetToken(token:TokenInfo)
  {
    this.tokenInfo = token;
  }

  public ResetToken()
  {
    this.transaction = null;
    this.tokenInfo = new TokenInfo();
    
    // reset example code strings
    this.codeName = null;
    this.codeSymbol = null;
    this.codeDecimals = null;
    this.codeInitialSupply = null;
    this.codeTreasuryAccountId = null;
    this.codeAdminKey = null;
    this.codeKYCKey = null;
    this.codeFreezeKey = null;
    this.codeWipeKey = null;
    this.codeSupplyKey = null;
    this.codeFeeScheduleKey = null;
    this.codeCustomFees = null;
    this.codeFreezeDefault = null;
    this.codeExpirationTime = null;
    this.codeAutoRenewAccount = null;
    this.codeAutoRenewPeriod = null;
    this.codeMemo = null;
  }

  CreateTransaction(token:TokenInfo)
  {

    this.transaction = this.CreateEmptyTransaction();

    this.SetTokenName(token.name);
    this.SetTokenSymbol(token.symbol);
    this.SetTreasuryAccountId(token.treasuryAccountId, token.treasuryKey);
    
    if(token.memo != null)
    {
      this.SetMemo(token.memo);
    }

    if(token.decimal != null)
    {
      this.SetDecimals(token.decimal);
    }

    if(token.initialSupply != null)
    {
      this.SetInitialSupply(token.initialSupply);
    }

    if(token.adminKey != null && token.adminKey != "")
    {
      this.SetAdminKey(token.adminKey);
    }

    if(token.wipeKey != null && token.wipeKey != "")
    {
      this.SetWipeKey(token.wipeKey);
    }

    if(token.supplyKey != null && token.supplyKey != "")
    {
      this.SetSupplyKey(token.supplyKey);
    }

    if(token.KYCKey != null && token.KYCKey != "")
    {
      this.SetKYCKey(token.KYCKey);
    }
    
    if(token.freezeKey != null && token.freezeKey != "")
    {
      this.SetFreezeKey(token.freezeKey);
    }
    
    if(token.freezeDefault != null)
    {
      this.SetFreezeDefault(token.freezeDefault);
    }

		this.transaction.freezeWith(this.hederaSDKService.GetClient());

  }

  CreateEmptyTransaction(): TokenCreateTransaction
  {

    let transaction = new TokenCreateTransaction();
      
    return transaction;

  }

  public SetTokenName(pName:string)
  {

    this.transaction.setTokenName(pName);

    this.tokenInfo.name = pName;
    
    if(pName == null)
    {
      this.codeName = null;
    } else 
    {
      this.codeName = "  .setTokenName(\"" + pName + "\")";
    }

  }

  public SetTokenSymbol(pSymbol:string)
  {

    this.transaction.setTokenSymbol(pSymbol);

    this.tokenInfo.symbol = pSymbol;
    if(pSymbol == null)
    {
      this.codeSymbol = null;
    } else 
    {
      this.codeSymbol = "  .setTokenSymbol(\"" + pSymbol + "\")";
    }
  }

  public SetDecimals(pDecimals:number)
  {
    
    this.transaction.setDecimals(pDecimals);

    this.tokenInfo.decimal = pDecimals;
    if(pDecimals == null)
    {
      this.codeDecimals = null;
    } else 
    {
      this.codeDecimals = "  .setDecimals(" + pDecimals + ")";
    }
    
  }

  public SetInitialSupply(pSupply:number)
  {
    
    this.transaction.setInitialSupply(pSupply);

    this.tokenInfo.initialSupply = pSupply;
    if(pSupply == null)
    {
      this.codeInitialSupply = null;
    } else 
    {
      this.codeInitialSupply = "  .setInitialSupply(" + pSupply + ")";
    }
    
  }

  public SetTreasuryAccountId(pAccount:string, pTreasuryKey:string)
  {
    
    this.transaction.setTreasuryAccountId(pAccount);


    this.tokenInfo.treasuryAccountId = pAccount;
    this.tokenInfo.treasuryKey = pTreasuryKey; // we will need to sign the transaction with the treasury key at the end.
    if(pAccount == null)
    {
      this.codeTreasuryAccountId = null;
    } else 
    {
      this.codeTreasuryAccountId = "  .setTreasuryAccountId(" + pAccount + ")";
    }
    
  }
  
  public SetAdminKey(pKey:string)
  {
    
    this.transaction.setAdminKey(PrivateKey.fromString(pKey));

    this.tokenInfo.adminKey = pKey;
    if(pKey == null)
    {
      this.codeAdminKey = null;
    } else 
    {
      this.codeAdminKey = "  .setAdminKey(" + pKey.substr(32,10) + "..." + ")";
    }
    
  }
  
  public SetKYCKey(pKey:string)
  {
    
    this.transaction.setKycKey(PrivateKey.fromString(pKey));

    this.tokenInfo.KYCKey = pKey;
    if(pKey == null)
    {
      this.codeKYCKey = null;
    } else 
    {
      this.codeKYCKey = "  .setKycKey(" + pKey.substr(32,10) + "..."  + ")";
    }
    
  }
  
  public SetFreezeKey(pKey:string)
  {
    
    this.transaction.setFreezeKey(PrivateKey.fromString(pKey));

    this.tokenInfo.freezeKey = pKey;
    if(pKey == null)
    {
      this.codeFreezeKey = null;
    } else 
    {
      this.codeFreezeKey = "  .setFreezeKey(" + pKey.substr(32,10) + "..."  + ")";
    }
    
  }
  
  public SetWipeKey(pKey:string)
  {
    
    this.transaction.setWipeKey(PrivateKey.fromString(pKey));

    this.tokenInfo.wipeKey = pKey;
    if(pKey == null)
    {
      this.codeWipeKey = null;
    } else 
    {
      this.codeWipeKey = "  .setWipeKey(" + pKey.substr(32,10) + "..."  + ")";
    }
    
  }
  
  public SetSupplyKey(pKey:string)
  {
    
    this.transaction.setSupplyKey(PrivateKey.fromString(pKey));

    this.tokenInfo.supplyKey = pKey;
    if(pKey == null)
    {
      this.codeSupplyKey = null;
    } else 
    {
      this.codeSupplyKey = "  .setSupplyKey(" + pKey.substr(32,10) + "..."  + ")";
    }
    
  }
  /*
  public SetFeeScheduleKey(pKey:string)
  {
    
    this.transaction.setFeeScheduleKey(pKey);

    this.tokenInfo.feeScheduleKey = pKey;
    if(pKey == null)
    {
      this.codeFeeScheduleKey = null;
    } else 
    {
      this.codeFeeScheduleKey = "  .setFeeScheduleKey(" + pKey.substr(32,10) + "..."  + ")";
    }
    
  }
  
  public SetCustomFees(pCustomFees:CustomFee[])
  {
  
    this.transaction.setCustomFees(pCustomFees);

    this.tokenInfo.customFees = pCustomFees;
    if(pCustomFees == null)
    {
      this.codeCustomFees = null;
    } else 
    {
      this.codeCustomFees = "  .setCustomFee( [FEES] )";
    }
    
  }
  */
  public SetFreezeDefault(pDefault:boolean)
  {
    
    this.transaction.setFreezeDefault(pDefault);

    this.tokenInfo.freezeDefault = pDefault;
    if(pDefault == null)
    {
      this.codeFreezeDefault = null;
    } else 
    {
      this.codeFreezeDefault = "  .setFreezeDefault(" + pDefault + ")";
    }
    
  }
  
  public SetMemo(pMemo:string)
  {
    
    this.transaction.setTokenMemo(pMemo);

    this.tokenInfo.memo = pMemo;
    if(pMemo == null)
    {
      this.codeMemo = null;
    } else 
    {
      this.codeMemo = "  .setTokenMemo(" + pMemo + ")";
    }
    
  }
  
  
  /**
  codeExpirationTime: string;
  codeAutoRenewAccount: string;
  codeAutoRenewPeriod: string;
  */

}
