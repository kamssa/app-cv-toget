import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditProfilPage } from './edit-profil.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
   IonicModule,
   FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class EditProfilPageModule {}
