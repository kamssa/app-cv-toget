import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {RegisterService} from '../../services/register.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit {
  @Input('profil') profil;
  @Input('edit') edit: string;

  constructor(private modalCtrl: ModalController, navParams: NavParams,
              private auth : RegisterService, private storage: Storage ) {}

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  updateProfil(f){
    console.log(f.value);
    this.auth.updateProfil(f.value).subscribe(resp => {
      if (resp['status'] === 200) {
          this.storage.get('access_data').then(data => {
            f.value = data;
            this.storage.set('access_data', f.value);
            console.log('OK', f.value);
          });
         }
    });

  }


}
