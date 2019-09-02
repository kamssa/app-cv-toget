import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaCollectionPage } from './ma-collection.page';
import { ModeleCarteComponent } from '../components/modele-carte/modele-carte.component';
import { SingleCartePageModule } from '../single-carte/single-carte.module';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MaCollectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MaCollectionPage]
})
export class MaCollectionPageModule {}
