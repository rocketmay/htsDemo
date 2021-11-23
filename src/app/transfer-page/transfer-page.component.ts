import { AccountInfo } from './../classes/account-info';
import { HederaSDKService } from './../services/hedera-sdk.service';
import { DemoServiceService } from './../services/demo-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.scss', './../shared/sharedStyle.scss']
})
export class TransferPageComponent implements OnInit {
  
  @Input() sender:string;
  @Input() target:string;
  @Input() amount:string;

  changeT:boolean=false;
  changeA:boolean=false;
  changeB:boolean=false;

  constructor(public demoService:DemoServiceService, private hederaSDKService:HederaSDKService) { }

  ngOnInit(): void {
    
  }

  triggerUserBoxes()
  {
    this.changeT = !this.changeT;
    this.changeA = !this.changeA;
    this.changeB = !this.changeB;
  }

  transfer()
  {
    if(this.sender != null && this.target != null && this.amount != null)
    {
      
      let value = parseInt(this.amount);
      console.log(this.amount + " . " + value);
      if(this.target != this.sender)
      {

        let targetAccount = this.selectName(this.target);
        let senderAccount = this.selectName(this.sender);

        this.hederaSDKService.initClient();
        let receipt;
        this.hederaSDKService.sendToken(this.demoService.tokenInfo.tokenId,targetAccount.accountId,senderAccount.accountId,senderAccount.privateKey,value)
          .then(result => {
            receipt = result; 
            this.triggerUserBoxes();
          });


      }

    }
  }

  selectName(name:string):AccountInfo
  {
    switch(name)
    {
      case "Treasury":
        return this.demoService.treasuryAccount;
      case "Alice":
        return this.demoService.userA;
      case "Bob":
        return this.demoService.userB;
    }
    return null;
  }


}
