import { RouterModule } from '@angular/router';
import { CreateTokenComponent } from './create-token/create-token.component';
import { TokenstatComponent } from './tokenstat/tokenstat.component';
import { UsermgmtComponent } from './usermgmt/usermgmt.component';
import { TokenomicsComponent } from './tokenomics/tokenomics.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HtsBasicsComponent } from './hts-basics/hts-basics.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TransferPageComponent } from './transfer-page/transfer-page.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HtsBasicsComponent,
    LeftMenuComponent,
    TokenomicsComponent,
    UsermgmtComponent,
    TokenstatComponent,
    CreateTokenComponent,
    TransferPageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
