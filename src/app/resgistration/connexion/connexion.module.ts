import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ConnexionPage } from './connexion.page';
import {TooltipsModule} from 'ionic-tooltips';

const routes: Routes = [
  {
    path: '',
    component: ConnexionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TooltipsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConnexionPage]
})
export class ConnexionPageModule {}
