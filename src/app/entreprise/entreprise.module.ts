import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntreprisePage } from './entreprise.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: EntreprisePage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntreprisePage]
})
export class EntreprisePageModule {}
