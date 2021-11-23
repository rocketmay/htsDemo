import { HederaSDKService } from './../services/hedera-sdk.service';
import { DemoServiceService } from './../services/demo-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usermgmt',
  templateUrl: './usermgmt.component.html',
  styleUrls: ['./../shared/sharedStyle.scss']
})
export class UsermgmtComponent implements OnInit {

  public KYCKey:boolean = false;
  public manualKYCKey:boolean = false;

  public freezeKey:boolean = false;
  public manualFreezeKey:boolean = false;

  public freezeDefault:boolean = false;

  constructor(private demoService:DemoServiceService, private hederaSDKService:HederaSDKService) { }

  ngOnInit(): void {
    if(this.demoService.tokenInfo.KYCKey != null)
    {
      this.KYCKey = true;
    }
    if(this.demoService.tokenInfo.freezeKey != null)
    {
      this.freezeKey = true;
    }
    if(this.demoService.tokenInfo.freezeDefault != null)
    {
      this.freezeDefault = this.demoService.tokenInfo.freezeDefault;
    }
  }

/** */

  toggleKYCKey()
  {
    this.KYCKey = !this.KYCKey;

    if(!this.KYCKey)
    {
      this.manualKYCKey = false;
      this.demoService.tokenInfo.KYCKey = null;
    } else
    {
      this.manualKYCKey = false;
      this.demoService.tokenInfo.KYCKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }

  toggleManualKYCKey()
  {
    this.manualKYCKey = !this.manualKYCKey;

    if(this.manualKYCKey)
    {
      this.demoService.tokenInfo.KYCKey = "";
    } else
    {
      this.demoService.tokenInfo.KYCKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }

/** */

/** */

toggleFreezeKey()
{
  this.freezeKey = !this.freezeKey;

  if(!this.freezeKey)
  {
    this.manualFreezeKey = false;
    this.demoService.tokenInfo.freezeKey = null;
  } else
  {
    this.manualFreezeKey = false;
    this.demoService.tokenInfo.freezeKey = this.hederaSDKService.GeneratePrivateKey();
  }
}

toggleManualFreezeKey()
{
  this.manualFreezeKey = !this.manualFreezeKey;

  if(this.manualFreezeKey)
  {
    this.demoService.tokenInfo.freezeKey = "";
  } else
  {
    this.demoService.tokenInfo.freezeKey = this.hederaSDKService.GeneratePrivateKey();
  }
}

/** */

toggleFreezeDefault()
{
  this.freezeDefault = !this.freezeDefault;
  this.demoService.tokenInfo.freezeDefault = this.freezeDefault;
}

}
