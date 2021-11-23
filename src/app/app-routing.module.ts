import { TransferPageComponent } from './transfer-page/transfer-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTokenComponent } from './create-token/create-token.component';
import { UsermgmtComponent } from './usermgmt/usermgmt.component';
import { TokenomicsComponent } from './tokenomics/tokenomics.component';
import { HtsBasicsComponent } from './hts-basics/hts-basics.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    { path: 'index',            component: IndexComponent },
    { path: 'basics', component: HtsBasicsComponent},
    { path: 'tokenomics', component: TokenomicsComponent},
    { path: 'usermgmt', component: UsermgmtComponent},
    { path: 'create', component: CreateTokenComponent},
    { path: 'submit', component: CreateTokenComponent},
    { path: 'receipt', component: CreateTokenComponent},
    { path: 'transfer', component: TransferPageComponent},
    { path: '', redirectTo: 'basics', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
