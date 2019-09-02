import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AidePage } from './aide.page';
// import { ExpandableComponent } from "../components/expandable/expandable.component";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: AidePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AidePage]
})
export class AidePageModule {}
