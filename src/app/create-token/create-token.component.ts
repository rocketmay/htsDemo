
import { Router } from '@angular/router';
import { TokenCreateServiceService } from './../services/token-create-service.service';
import { HederaSDKService } from './../services/hedera-sdk.service';
import { DemoServiceService } from './../services/demo-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css', './../shared/sharedStyle.scss']
})
export class CreateTokenComponent implements OnInit {

  constructor(private demoService:DemoServiceService, private hederaSDKService:HederaSDKService,private tokenCreateService:TokenCreateServiceService, private router: Router) { }

  stepTitle:string = "";
  buttonTitle:string = "";
  consoleText:string[];

  ngOnInit(): void {
    switch(this.router.url)
    {
      case "/create":
        this.stepTitle = "Step 1: Create Transaction";
        this.buttonTitle = "CREATE TRANSACTION";
        this.consoleText = this.demoService.consoleCreateTransaction;
        break;
      case "/submit":
        this.stepTitle = "Step 2: Sign and Submit to Hedera Network";
        this.buttonTitle = "SUBMIT";
        this.consoleText = this.demoService.consoleSignAndSubmit;
        break;
      case "/receipt":
        this.stepTitle = "Step 3: Receive Receipt";
        this.buttonTitle = "PROCESS RECEIPT";
        this.consoleText = this.demoService.consoleReceipt;
        this.processReceipt();
        break;
      default:
        this.stepTitle = "Default";
    }
    
  }

  isSubmit():boolean
  {
    if(this.router.url == "/submit")
    return true;
    else
    return false;
  }

  buttonPress()
  {
    switch(this.router.url)
      {
        case "/create":
          this.buttonCreate();
          break;
        case "/submit":
          this.buttonSubmit();
          break;
        case "/receipt":
          this.buttonReceipt();
          break;
        default:
      }
  }

  buttonSign()
  {
    this.hederaSDKService.initClient();
    this.addLine("> Sign Transaction with Keys");
    if(this.demoService.tokenInfo.adminKey != null)
    {
      this.addLine("  signTx = await transaction.sign(PrivateKey.fromString(tokeninfo.adminKey));");
    }

    if(this.demoService.tokenInfo.treasuryKey != null)
    {
      this.addLine("  signTx = await transaction.sign(PrivateKey.fromString(tokeninfo.treasuryKey));");
    }
    this.addLine("");
  }

  async buttonSubmit()
  {
    //this.addLine("> Initialize Client");
    this.hederaSDKService.initClient();
    //this.addLine("  this.client = Client.forTestnet();");
    //this.addLine("  this.client.setOperator(operatorId, operatorKey);");
    //this.addLine("");

    this.addLine("> Execute the Transaction on the Hedera API");
    this.addLine("const txResponse = await transaction.execute(this.client);");
    this.addLine("");
    this.addLine("");
    this.addLine("> Wait for Response from Hedera API...");
    this.addLine("...");
    this.demoService.response = await this.hederaSDKService.CreateToken(this.tokenCreateService.transaction,this.demoService.tokenInfo);
    
    this.addLine("Received!");
    this.addLine("");
    
    this.addLine(" > Transaction ID: " + this.demoService.response.transactionId);
    this.demoService.receipt = await this.demoService.response.getReceipt(this.hederaSDKService.GetClient());
    this.demoService.txnCreateLink = "https://testnet.dragonglass.me/transactions/" + this.demoService.response.transactionId.toString().replace(/[^0-9]/g, '');
    this.demoService.consoleReceipt = [];
    
  }

  buttonReceipt()
  {
    this.addLine(" > Receipt Contents");
    this.addLine("  Status : " + this.demoService.receipt.status.toString());
    this.addLine("  Token ID : " + this.demoService.receipt.tokenId);
    this.addLine("  Others : [not shown]");

    this.demoService.tokenInfo.tokenId = this.demoService.receipt.tokenId.toString();
  }

  processReceipt()
  {

  }

  buttonCreate()
  {
    this.tokenCreateService.ResetToken();
    this.hederaSDKService.initClient();
    this.tokenCreateService.CreateTransaction(this.demoService.tokenInfo);
    this.addLine("let transaction = new TokenCreateTransaction()");
    this.addLine(this.tokenCreateService.codeName);
    this.addLine(this.tokenCreateService.codeSymbol);
    this.addLine(this.tokenCreateService.codeTreasuryAccountId);



    this.addLine(this.tokenCreateService.codeMemo );
      
    this.addLine(this.tokenCreateService.codeDecimals);
    this.addLine(this.tokenCreateService.codeInitialSupply);
    this.addLine(this.tokenCreateService.codeAdminKey );
    this.addLine(this.tokenCreateService.codeWipeKey );
    this.addLine(this.tokenCreateService.codeSupplyKey );
    this.addLine(this.tokenCreateService.codeKYCKey );
    this.addLine(this.tokenCreateService.codeFreezeKey);
    this.addLine(this.tokenCreateService.codeFreezeDefault );
    this.addLine(this.tokenCreateService.codeFeeScheduleKey );
    this.addLine( this.tokenCreateService.codeCustomFees );
    this.addLine(this.tokenCreateService.codeExpirationTime );
    this.addLine(this.tokenCreateService.codeAutoRenewAccount );
    this.addLine(this.tokenCreateService.codeAutoRenewPeriod );
    this.addLine("  .freezeWith(client);");
  }

  addLine(line:string)
  {
    if(line != null)
    {
      let temp = line;
      switch(this.router.url)
      {
        case "/create":
          this.demoService.consoleCreateTransaction.push(temp);
          this.consoleText = this.demoService.consoleCreateTransaction;
          break;
        case "/submit":
          this.demoService.consoleSignAndSubmit.push(temp);
          this.consoleText = this.demoService.consoleSignAndSubmit;
          break;
        case "/receipt":
          this.demoService.consoleReceipt.push(temp);
          this.consoleText = this.demoService.consoleReceipt;
          break;
        default:
      }
      
    }
  }

  clearConsole()
  {
    switch(this.router.url)
    {
      case "/create":
        this.demoService.consoleCreateTransaction = [];
        this.consoleText = this.demoService.consoleCreateTransaction;
        break;
      case "/submit":
        this.demoService.consoleSignAndSubmit = [];
        this.consoleText = this.demoService.consoleSignAndSubmit;
        break;
      case "/receipt":
        this.demoService.consoleReceipt = [];
        this.consoleText = this.demoService.consoleReceipt;
        break;
      default:
    }
  }

}
