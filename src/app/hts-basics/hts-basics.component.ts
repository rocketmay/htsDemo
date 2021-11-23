import { Client, PrivateKey, AccountId } from '@hashgraph/sdk';
import { HederaSDKService } from './../services/hedera-sdk.service';
import { DemoServiceService } from './../services/demo-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hts-basics',
  templateUrl: './hts-basics.component.html',
  styleUrls: ['./hts-basics.component.css','./../shared/sharedStyle.scss']
})
export class HtsBasicsComponent implements OnInit {

  public manualTreasury:boolean = false;
  public adminKey:boolean = false;
  public manualAdminKey:boolean = false;

  constructor(public demoService:DemoServiceService, private hederaSDKService:HederaSDKService) { }

  ngOnInit(): void {


    if(this.demoService.tokenInfo.adminKey != null)
    {
      this.adminKey = true;
    }

  }

  isTreasuryDisabled(): boolean
  {
    return !this.manualTreasury
    
  }

  toggleManualTreasury()
  {
    this.manualTreasury = !this.manualTreasury;

    if(!this.manualTreasury)
    {
      this.demoService.SetDefaultTreasury();
    } else
    {
      this.demoService.tokenInfo.treasuryAccountId = "";
      this.demoService.tokenInfo.treasuryKey = "";
    }
  }

  isAdminDisabled(): boolean
  {
    return !this.adminKey;

  }

  toggleAdminKey()
  {
    this.adminKey = !this.adminKey;

    if(!this.adminKey)
    {
      this.manualAdminKey = false;
      this.demoService.tokenInfo.adminKey = null;
    } else
    {
      this.manualAdminKey = false;
      this.demoService.tokenInfo.adminKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }

  toggleManualAdminKey()
  {
    this.manualAdminKey = !this.manualAdminKey;

    if(this.manualAdminKey)
    {
      this.demoService.tokenInfo.adminKey = "";
    } else
    {
      this.demoService.tokenInfo.adminKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }

}
