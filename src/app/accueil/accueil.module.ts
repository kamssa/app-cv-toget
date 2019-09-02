import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AccueilPage } from './accueil.page';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MaCollectionPage } from '../ma-collection/ma-collection.page';
import {ModalImagePage} from '../modal-image/modal-image.page';
import {ModalImagePageModule} from '../modal-image/modal-image.module';
import {ComponentsModule} from '../components/components.module';


@NgModule({
  entryComponents:[ModalImagePage],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicModule,
    ModalImagePageModule,
    ComponentsModule,

    RouterModule.forChild([
      {
        path: '',
        component: AccueilPage
      }
    ])
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule {

 constructor(){
   
 }


}
