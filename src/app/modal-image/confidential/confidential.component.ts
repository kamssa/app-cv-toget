import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ConfidenceModalComponent } from '../confidence-modal/confidence-modal.component';

@Component({
  selector: 'app-confidential',
  templateUrl: './confidential.component.html',
  styleUrls: ['./confidential.component.scss'],
})
export class ConfidentialComponent implements OnInit {

  profil:any;
  carte:any;
  carte_confidence:number=0;
  profil_confidence:number=0;
  

  constructor(private modalCtrl: ModalController, private poperCtrl: PopoverController) { 
    this.profil = 'Privée';
    this.carte = 'Privée';
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  async presentPopCarte(ev: any) {
    const popover = await this.poperCtrl.create({
      component: ConfidenceModalComponent,
      event: ev,
      componentProps:{titre: 'Mes cartes de visite',confidence:this.carte_confidence}
    });
    popover.onDidDismiss().then((data)=>{
      if (data!== null) {
        this.carte = (data.data == 0)?'Privée':'Public';
      }
    })
    return await popover.present();
  }

  async presentPopProfil(ev: any) {
    const popover = await this.poperCtrl.create({
      component: ConfidenceModalComponent,
      event: ev,
      componentProps:{titre: 'Mon profil',confidence:this.profil_confidence}
    });
    popover.onDidDismiss().then((data)=>{
      if (data!== null) {
        this.profil = (data.data == 0)?'Privée':'Public';
      }
    })
    return await popover.present();
  }

}
