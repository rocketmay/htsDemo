import { HederaSDKService } from './../services/hedera-sdk.service';
import { DemoServiceService } from './../services/demo-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tokenomics',
  templateUrl: './tokenomics.component.html',
  styleUrls: ['./../shared/sharedStyle.scss']
})
export class TokenomicsComponent implements OnInit {

  public wipeKey:boolean = false;
  public manualWipeKey:boolean = false;
  public supplyKey:boolean = false;
  public manualSupplyKey:boolean = false;

  private maxSupply = 9223372036854775807;
  public error:string = "";

  _decimal: number=0;
  get decimal(): number {
      return this._decimal;
  }
  @Input() set decimal(newDecimal: number) {
      this._decimal = newDecimal;
      this.updateSupply();
  }

  _supply: number;
  get supply(): number {
      return this._supply;
  }
  @Input() set supply(newSupply: number) {
      this._supply = newSupply;
      this.updateSupply();
  }
  public totalWhole:string = "-";

  constructor(public demoService:DemoServiceService, private hederaSDKService:HederaSDKService) { }

  ngOnInit(): void {
    if(this.demoService.tokenInfo.wipeKey != null)
    {
      this.wipeKey = true;
      
    }
    if(this.demoService.tokenInfo.supplyKey != null)
    {
      this.supplyKey = true;
    }

    if(this.demoService.tokenInfo.initialSupply != null)
    {
      this._supply = this.demoService.tokenInfo.initialSupply;
    }
    if(this.demoService.tokenInfo.decimal != null)
    {
      this._decimal = this.demoService.tokenInfo.decimal;
    }

    this.updateSupply();
  }

  updateSupply()
  {
    this.demoService.tokenInfo.decimal = this.decimal;
    this.demoService.tokenInfo.initialSupply = this.supply;
    if(this.decimal != null && this.decimal > 0)
    {
      if(this.supply > 0)
      {
          let val = this.supply/(10**this.decimal);
          this.totalWhole = Math.round(val).toString();
      } else
      {
        this.totalWhole = "-";
      }
    } else
    {
      if(this.supply > 0)
      {
        this.totalWhole = this.supply.toString();
      } else
      {
        this.totalWhole = "-";
      }
    }

    if(this.supply > this.maxSupply)
    {
      this.error = "  (Can't be greater than 2^63-1)"
    } else
    {
      this.error = "";
    }
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  toggleWipeKey()
  {
    this.wipeKey = !this.wipeKey;

    if(!this.wipeKey)
    {
      this.manualWipeKey = false;
      this.demoService.tokenInfo.wipeKey = null;
    } else
    {
      this.manualWipeKey = false;
      this.demoService.tokenInfo.wipeKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }

  toggleManualWipeKey()
  {
    this.manualWipeKey = !this.manualWipeKey;

    if(this.manualWipeKey)
    {
      this.demoService.tokenInfo.wipeKey = "";
    } else
    {
      this.demoService.tokenInfo.wipeKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }



  /**  */

  toggleSupplyKey()
  {
    this.supplyKey = !this.supplyKey;

    if(!this.supplyKey)
    {
      this.manualSupplyKey = false;
      this.demoService.tokenInfo.supplyKey = null;
    } else
    {
      this.manualSupplyKey = false;
      this.demoService.tokenInfo.supplyKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }

  toggleManualSupplyKey()
  {
    this.manualSupplyKey = !this.manualSupplyKey;

    if(this.manualSupplyKey)
    {
      this.demoService.tokenInfo.supplyKey = "";
    } else
    {
      this.demoService.tokenInfo.supplyKey = this.hederaSDKService.GeneratePrivateKey();
    }
  }
  

  /**  */
  


}
