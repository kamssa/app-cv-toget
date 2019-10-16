import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavParams } from '@ionic/angular';
import { ModeleService } from 'src/app/services/modele.service';
import { MessageAlerteService } from 'src/app/services/message-alerte.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
public email:any;
public code:any;
public password:any;
public repassword:any;

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,
    private modelService: ModeleService,
    private  messageAlerte: MessageAlerteService,private router: Router
    ) { }

  ngOnInit() {
    this.email=this.navParams.get('email');
    this.code=this.navParams.get('code');
  }
  
  public resetPassword() {
    if(this.code && this.email && this.password && this.repassword){

    this.modelService.passWordReset(this.code,this.email,this.password,this.repassword).subscribe(data => {
      if (data['status'] == 200) {
        this.modalCtrl.dismiss().then(()=>{
          this.messageAlerte.presentAlert('',  data['message']);
            this.router.navigateByUrl('/connexion');
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
    }else{
      this.messageAlerte.presentAlert('', 'Vérifier votre saisie svp !');
    }
}

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
