import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParticulierPage } from './particulier.page';
import { ZoomCarteDirective } from '../directives/zoom-carte.directive';

const routes: Routes = [
  {
    path: '',
    component: ParticulierPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [ParticulierPage, ZoomCarteDirective]
})
export class ParticulierPageModule {}
