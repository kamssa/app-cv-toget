import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentairePage } from './commentaire.page';
import { ComponentsModule } from '../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: CommentairePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommentairePage]
})
export class CommentairePageModule {}
