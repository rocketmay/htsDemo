import { DemoServiceService } from './../services/demo-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tokenstat',
  templateUrl: './tokenstat.component.html',
  styleUrls: ['./tokenstat.component.css', './../shared/sharedStyle.scss']
})
export class TokenstatComponent implements OnInit {

  constructor(public demoService:DemoServiceService) { }

  ngOnInit(): void {

  }

  dragonglass()
  {
    window.open("https://testnet.dragonglass.me/hedera/tokens/" + this.demoService.tokenInfo.tokenId, "_blank"); 
  }
  txnCreate()
  {
    window.open(this.demoService.txnCreateLink, "_blank"); 
  }
}
