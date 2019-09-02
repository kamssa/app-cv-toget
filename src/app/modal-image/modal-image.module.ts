import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalImagePage } from './modal-image.page';
import { ParametresPageModule } from '../components/parametres/parametres.module';
import { ComptePageModule } from '../compte/compte.module';
import { ParametresPage } from '../components/parametres/parametres.page';
import { ComptePage } from '../compte/compte.page';
import { ConfidentialComponent } from './confidential/confidential.component';
import { MesCartesComponent } from './mes-cartes/mes-cartes.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { ConfidenceModalComponent } from './confidence-modal/confidence-modal.component';
import { ComponentsModule } from '../components/components.module';
import { GroupeByPipe } from '../pipes/groupe-by.pipe';

const routes: Routes = [
 // {
   // path: '',
//    component: ModalImagePage
 // }
];

@NgModule({
  entryComponents:[
    ParametresPage, 
    ComptePage, 
    ConfidentialComponent,
    MesCartesComponent,
    EditProfilComponent,
    SearchHistoryComponent,
    ConfidenceModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptePageModule,
    ComponentsModule,
    ParametresPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ModalImagePage,
    ConfidentialComponent,
    ConfidenceModalComponent,
    MesCartesComponent,
    GroupeByPipe,
    EditProfilComponent,
    SearchHistoryComponent]
})
export class ModalImagePageModule {}
