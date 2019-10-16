import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CollectionPage } from './collection.page';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

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

    ReactiveFormsModule,
    HttpClientModule, FilterPipeModule,
    HttpClientJsonpModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CollectionPage]
})
export class CollectionPageModule {}
