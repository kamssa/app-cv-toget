import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MessageAlerteService} from '../services/message-alerte.service';
import {RegisterService} from '../services/register.service';
import { Color } from '@mobiscroll/angular/src/js/classes/color';
import { ToastController, Platform, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.page.html',
  styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit {
  user: any;
  
    createSuccess: any;
    choix_communication: string = '';
    status: number = 1;
    choix: any = [
        {name:'whatsapp',icone:'logo-whatsapp', color:'#25d366'},
        {name:'sms',icone:'chatbubbles', color:'#1e90ff'},
        {name:'mail',icone:'mail', color:'#DA3119'}
    ];
    commentaireForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        nombre_c_v: ['', Validators.required],
        choix_communication: [this.choix_communication, Validators.required],
        status: [this.status, Validators.required],

    });


    constructor(
        private registerService: RegisterService,
        private router: Router,
        private fb: FormBuilder,
        private message: MessageAlerteService,
        public toastController: ToastController,
        private loadingCtl: LoadingController) {
            // this.presentToast();
            this.showLoading();
    }

ngOnInit()
{
	let u = this;
	// document.addEventListener("backbutton", u.onBackKeyDown(), false);
}

  
public valider()
{
    console.log(this.commentaireForm.value);
    this.registerService.demande(this.commentaireForm.value).subscribe(data => {
            if (data) {
                this.user = data;
                this.createSuccess = true;
                this.presentToast('Votre demande a été envoyée crée avec succes. ');

            } else {
                console.log('operation impossible');
            }
        },
        error => {
            console.log('erreur ');
        });

}
radioChangeHandler(event: any) {
this.choix_communication = event.target.value;
}
    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present().then(() => {
            this.router.navigate(['/accueil']);
        });
    }
    async showLoading(){
        let loading = await this.loadingCtl.create({
            message:"Chargement...",
            duration: 1000,
            showBackdrop: false,
            spinner: "lines-small"
        });
        loading.present();
    
    
    }
    
    
}
