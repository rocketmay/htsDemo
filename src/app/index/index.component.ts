import { DemoServiceService } from './../services/demo-service.service';
import { HederaSDKService } from './../services/hedera-sdk.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./../shared/sharedStyle.scss']
})
export class IndexComponent implements OnInit {

  model = {
    left: true,
    middle: false,
    right: false
};

@Input() adminName: string;
@Input() adminKey: string;
@Input() adminID: string;

focus;
focus1;
constructor(private demoService:DemoServiceService) { }

ngOnInit() {
 
  this.adminName = this.demoService.adminAccount.name;
  this.adminKey = this.demoService.adminAccount.privateKey;
  this.adminID = this.demoService.adminAccount.accountId;

}

}

