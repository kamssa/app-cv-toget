import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { VerificationComponent } from '../verification/verification.component';
import { ModeleService } from 'src/app/services/modele.service';
import {MessageAlerteService} from '../../services/message-alerte.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {

email:any;



  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private modelService: ModeleService,
    private  messageAlerte: MessageAlerteService

    ) {} 

  ngOnInit() {

  }

  

  async onValider(){
    const modal = await this.modalCtrl.create({
      component: VerificationComponent,
      componentProps:{
        email:this.email
      }
    });
    modal.present();
  } 

  isEmail(search:string):boolean
  {
      let  serchfind:boolean;

      let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      serchfind = regexp.test(search);

      console.log(serchfind)
      return serchfind
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  public forgetEmail() {
    this.modelService.email(this.email).subscribe(data => {
      if (data['status'] == 200) {
        this.modalCtrl.dismiss().then(()=>{
          this.onValider();
        });
       
      } else {
        data['status'] != 200;
        let message = data['message'];
        this.messageAlerte.presentAlert('', message);
      }
    },
      error => {
        console.log("erreur ");
      });
 
}

closeModal(){
  this.modalCtrl.dismiss();
}

}
