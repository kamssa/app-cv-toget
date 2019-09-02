import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CollectionPage } from './collection.page';
import { MbscModule } from '@mobiscroll/angular';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SingleCartePage } from '../single-carte/single-carte.page';
import { ModeleCarteComponent } from '../components/modele-carte/modele-carte.component';
import { ExpandableComponent } from '../components/expandable/expandable.component';
import { SingleCartePageModule } from '../single-carte/single-carte.module';
import { ComponentsModule } from '../components/components.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
const routes: Routes = [
  {
    path: '',
    component: CollectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    MbscModule,
    ReactiveFormsModule,
    HttpClientModule,FilterPipeModule,
    HttpClientJsonpModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CollectionPage]
})
export class CollectionPageModule {}
