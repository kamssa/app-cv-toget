import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import {TooltipsModule} from 'ionic-tooltips';
import { IonicSelectableModule } from 'ionic-selectable';
// import { CountryPickerModule } from 'ngx-country-picker';
const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    NgxMatIntlTelInputModule,
    IonicModule,
      TooltipsModule,IonicSelectableModule,
      FormsModule,
      ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
