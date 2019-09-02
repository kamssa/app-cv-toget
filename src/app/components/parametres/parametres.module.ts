import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParametresPage } from './parametres.page';
import {NotificationComponent} from '../../params/notification/notification.component';
import { SecuriteComponent } from 'src/app/params/securite/securite.component';
import { StockageComponent } from 'src/app/params/stockage/stockage.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ParametresPage
  // }
];

@NgModule({
 
  entryComponents:[
    NotificationComponent, SecuriteComponent, StockageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParametresPage, NotificationComponent ,SecuriteComponent, StockageComponent]
})
export class ParametresPageModule {}
