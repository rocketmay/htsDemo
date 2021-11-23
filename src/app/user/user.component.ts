import { DemoServiceService } from './../services/demo-service.service';
import { BigNumber } from 'bignumber.js';
import { HederaSDKService } from './../services/hedera-sdk.service';
import { AccountInfo } from './../classes/account-info';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss', './../shared/sharedStyle.scss']
})
export class UserComponent implements OnInit {

  @Input() user:AccountInfo;
  @Input() balance:BigNumber;

  @Input() associated:boolean = false;
  @Input() amount:Long;

  @Input() change:boolean;

  ngOnChanges(changes: SimpleChanges)
  {
    for(let property in changes)
    {
      if(property === 'change')
      {
        this.updateBalance();
      }
    }
  }

  constructor(private hederaSDKService:HederaSDKService, public demoService:DemoServiceService) {  }

  ngOnInit(): void {

    this.updateBalance();
    this.hederaSDKService.initClient();
    let relationships;
    this.hederaSDKService.GetTokenAssociations(this.user.accountId).then(result => {
    
      relationships = result;
      if(this.demoService.tokenInfo.tokenId != null)
      {
        if(relationships.get(this.demoService.tokenInfo.tokenId) != null)
        {
          this.associated = true;
          
          this.hederaSDKService.GetTokenBalance(this.user.accountId,this.demoService.tokenInfo.tokenId).then(result => this.amount = result);
        }
      };
      
    });

    
    
  }

  dragonglass()
  {
    window.open("https://testnet.dragonglass.me/hedera/accounts/" + this.user.accountId, "_blank"); 
  }

  async updateBalance()
  {
      //console.log("Updating Balance for " + this.user.name);
      this.hederaSDKService.initClient();
      this.balance = await this.hederaSDKService.GetHBARBalance(this.user.accountId);
      if(this.associated)
      {
        this.hederaSDKService.GetTokenBalance(this.user.accountId,this.demoService.tokenInfo.tokenId).then(result => this.amount = result);
      } else
      {
        this.checkRelationship();
      }
  }

  checkRelationship()
  {
    let relationships;
    this.hederaSDKService.GetTokenAssociations(this.user.accountId).then(result => {
    
      relationships = result;
      if(this.demoService.tokenInfo.tokenId != null)
      {
        if(relationships.get(this.demoService.tokenInfo.tokenId) != null)
        {
          this.associated = true;
          
          this.hederaSDKService.GetTokenBalance(this.user.accountId,this.demoService.tokenInfo.tokenId).then(result => this.amount = result);
        }
      };
    });
  }

  async associate(tokenId:string)
  {
    this.hederaSDKService.initClient();
    let response = await this.hederaSDKService.associateTokenToAccount(tokenId,this.user.accountId,this.user.privateKey);
    this.updateBalance();
  }

}
