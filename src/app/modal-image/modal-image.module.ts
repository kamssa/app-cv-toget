import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalImagePage } from './modal-image.page';
import { ParametresPageModule } from '../components/parametres/parametres.module';
import { ComptePageModule } from '../compte/compte.module';
import { ParametresPage } from '../components/parametres/parametres.page';
import { ComptePage } from '../compte/compte.page';
import { ConfidentialComponent } from './confidential/confidential.component';
import { MesCartesComponent } from './mes-cartes/mes-cartes.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { ConfidenceModalComponent } from './confidence-modal/confidence-modal.component';
import { ComponentsModule } from '../components/components.module';
import { GroupeByPipe } from '../pipes/groupe-by.pipe';
import {EditProfilPage} from './edit-profil/edit-profil.page';

const routes: Routes = [

];

@NgModule({
  entryComponents:[
    ParametresPage, 
    ComptePage, 
    ConfidentialComponent,
    MesCartesComponent,
    SearchHistoryComponent,
    ConfidenceModalComponent,
    EditProfilPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptePageModule,
    ComponentsModule,
    ParametresPageModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ModalImagePage,
    ConfidentialComponent,
    ConfidenceModalComponent,
    MesCartesComponent,
    GroupeByPipe,
    SearchHistoryComponent,
    EditProfilPage]
})
export class ModalImagePageModule {}
