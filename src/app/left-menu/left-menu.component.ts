import { TokenCreateServiceService } from './../services/token-create-service.service';
import { DemoServiceService } from './../services/demo-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInfo } from '../classes/token-info';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./../shared/sharedStyle.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor(
    private route: Router,private demoService:DemoServiceService, private tokenCreateService:TokenCreateServiceService) { }

  ngOnInit(): void {
  }

  resetToken()
  {
    this.demoService.tokenInfo = new TokenInfo();
  }

  minReqsMet():boolean
  {
    if(this.demoService.tokenInfo.name != null && this.demoService.tokenInfo.symbol != null && this.demoService.tokenInfo.treasuryAccountId != null && this.demoService.tokenInfo.treasuryKey != null )
    {
      return true;
    } else
    {
      return false;
    }
  }

  submitReqsMet():boolean
  {
    if(this.tokenCreateService.transaction != null)
    {
      return true;
    } else
    {
      return false;
    }
  }

  receiptReqsMet():boolean
  {
    if(this.demoService.receipt != null)
    {
      return true;
    } else
    {
      return false;
    }

  }

  transferReqsMet():boolean{
    if(this.demoService.tokenInfo.tokenId != null)
    {
      return true;
    } else
    {
      return false;
    }
  }

}
